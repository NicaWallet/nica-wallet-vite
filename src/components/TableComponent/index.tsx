import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  SxProps,
  Theme,
  TableProps,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ClearAll, Clear, Visibility, Edit, Delete } from "@mui/icons-material";
import columnConfig, { IColumnConfig } from "./columnConfig";
import { useTranslation } from "react-i18next";

type ColumnFilterValue = string | string[] | number | number[] | null;

export interface TableComponentProps<T extends Record<string, unknown>>
  extends TableProps {
  columns?: IColumnConfig[];
  rows: T[];
  variant?: "default" | "compact" | "striped" | "bordered";
  sx?: SxProps<Theme>;
  columnOrder?: string[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  showRowNumber?: boolean;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
  handleView?: (row: T) => void;
  handleEdit?: (row: T) => void;
  handleDelete?: (row: T) => void;
}

const TableComponent = <T extends Record<string, unknown>>({
  columns = columnConfig,
  rows = [],
  variant = "default",
  sx = {},
  columnOrder,
  rowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
  showRowNumber = false,
  maxWidth = "100%",
  maxHeight = 500,
  minHeight = 500,
  handleView,
  handleEdit,
  handleDelete,
  ...props
}: TableComponentProps<T>) => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState<{
    [key: string]: ColumnFilterValue;
  }>({});
  const [page, setPage] = useState(0);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleOpenFilterDialog = () => setFilterDialogOpen(true);
  const handleCloseFilterDialog = () => setFilterDialogOpen(false);
  const toggleFilterSelection = (filterId: string) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(filterId)
        ? prevSelected.filter((id) => id !== filterId)
        : [...prevSelected, filterId]
    );
  };
  const confirmSelectedFilters = () => setFilterDialogOpen(false);
  const handleClearSelection = () => setSelectedFilters([]);

  // Función para acceder a propiedades anidadas mediante una cadena (e.g., "user.user_id")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedProperty = (obj: Record<string, any>, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : undefined, obj);
  };


  const variantStyles: { [key: string]: SxProps<Theme> } = {
    default: {},
    compact: {
      "& .MuiTableCell-root": {
        padding: "4px 8px",
        overflow: "auto",
      },
    },
    striped: {
      "& tbody tr:nth-of-type(odd)": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        overflow: "auto",
      },
    },
    bordered: {
      "& .MuiTableCell-root": {
        border: "1px solid",
        borderColor: "divider",
        overflow: "auto",
      },
    },
  };

  const combinedStyles = { ...variantStyles[variant], ...sx };

  const dataKeys = new Set<string>();

  const collectKeys = (obj: Record<string, unknown>, prefix = ""): void => {
    Object.keys(obj).forEach((key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      dataKeys.add(fullKey);
      if (typeof obj[key] === "object" && obj[key] !== null) {
        collectKeys(obj[key] as Record<string, unknown>, fullKey);
      }
    });
  };

  rows.forEach((row) => collectKeys(row));


  const orderedColumns = columnOrder
    ? (columnOrder
      .map((id) => columns.find((col) => col.id === id))
      .filter(Boolean) as IColumnConfig[])
    : [...columns].sort((a, b) => a.titleKey.localeCompare(b.titleKey));

  const filteredColumns = orderedColumns.filter((column) => {
    // console.log(`Checking Column ID: ${column.id}`);
    if (dataKeys.has(column.id)) {
      // console.log(`Column ID ${column.id} exists in data keys.`);
      return true;
    } else {
      // console.log(`Column ID ${column.id} does NOT exist in data keys.`);
      return false;
    }
  });

  // console.log("Ordered Columns:", orderedColumns);
  // console.log("Data Keys:", Array.from(dataKeys));



  const handleColumnFilterChange = (
    value: ColumnFilterValue,
    field: string
  ) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const clearFilter = (field: string) => {
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [field]: "",
    }));
  };

  const clearAllFilters = () => {
    setColumnFilters({});
    setSearchQuery("");
  };

  const filteredRows = rows.filter((row) => {
    const globalFilterMatch =
      searchQuery === "" ||
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

    const columnFilterMatch = filteredColumns.every((column) => {
      const filterValue = columnFilters[column.id];
      if (
        filterValue === undefined ||
        filterValue === null ||
        (Array.isArray(filterValue) && filterValue.length === 0)
      )
        return true;
      const cellValue = row[column.id as keyof T];

      switch (column.filterType) {
        case "search":
          return cellValue
            ?.toString()
            .toLowerCase()
            .includes((filterValue as string).toLowerCase());
        case "dropdown":
          return cellValue?.toString() === filterValue?.toString();
        case "multiselect":
          return (filterValue as string[]).includes(cellValue as string);
        case "radiobutton":
          return cellValue?.toString() === filterValue?.toString();
        default:
          return true;
      }
    });

    return globalFilterMatch && columnFilterMatch;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = filteredRows.slice(
    page * currentRowsPerPage,
    page * currentRowsPerPage + currentRowsPerPage
  );

  // console.log('Rows being passed to TableComponent:', rows);
  // console.log("Filtered Columns:", filteredColumns);
  // console.log("Filtered Rows:", filteredRows);
  // console.log("Paginated Rows:", paginatedRows);

  return (
    <Box sx={{ ...combinedStyles }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {filteredColumns.length > 5 && (
            <Button variant="outlined" onClick={handleOpenFilterDialog} sx={{ mb: 2 }}>
              {t("Seleccionar Filtros")}
            </Button>
          )}

          <Dialog open={filterDialogOpen} onClose={handleCloseFilterDialog} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              {t("Seleccionar Filtros a Usar")}
            </DialogTitle>
            <DialogContent dividers sx={{ px: 3, py: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {t("Elige los filtros que deseas aplicar para reducir la lista de columnas.")}
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                {filteredColumns.map((column) => (
                  <FormControlLabel
                    key={column.id}
                    control={
                      <Checkbox
                        checked={selectedFilters.includes(column.id)}
                        onChange={() => toggleFilterSelection(column.id)}
                      />
                    }
                    label={t(column.titleKey)}
                    sx={{ fontSize: "0.875rem" }}
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, justifyContent: "space-between" }}>
              <Button onClick={handleClearSelection} color="secondary">
                {t("Limpiar Selección")}
              </Button>
              <Button onClick={handleCloseFilterDialog} color="secondary">
                {t("Cancelar")}
              </Button>
              <Button onClick={confirmSelectedFilters} variant="contained" color="primary">
                {t("Aceptar")}
              </Button>
            </DialogActions>
          </Dialog>

          <Box
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label={t("Buscar")}
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ minWidth: 250 }}
              InputProps={{
                endAdornment: searchQuery && (
                  <IconButton
                    size="small"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear"
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                ),
              }}
            />
            {filteredColumns.map((column) => {
              if (!column.filterType || !selectedFilters.includes(column.id)) return null;
              const filterValue = columnFilters[column.id] || "";

              switch (column.filterType) {
                case "search":
                  return (
                    <Box key={column.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TextField
                        key={column.id}
                        label={t(column.titleKey)}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 150 }}
                        value={filterValue}
                        onChange={(e) => handleColumnFilterChange(e.target.value, column.id)}
                        InputProps={{
                          endAdornment: filterValue && (
                            <IconButton
                              size="small"
                              onClick={() => clearFilter(column.id)}
                              aria-label="Clear"
                            >
                              <Clear fontSize="small" />
                            </IconButton>
                          ),
                        }}
                      />
                    </Box>
                  );
                case "dropdown":
                  return (
                    <Box key={column.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FormControl key={column.id} variant="outlined" size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>{t(column.titleKey)}</InputLabel>
                        <Select
                          label={t(column.titleKey)}
                          value={filterValue}
                          onChange={(e) => handleColumnFilterChange(e.target.value, column.id)}
                        >
                          {column.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {t(option.label)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  );
                case "multiselect":
                  return (
                    <Box key={column.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FormControl key={column.id} variant="outlined" size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>{t(column.titleKey)}</InputLabel>
                        <Select
                          label={t(column.titleKey)}
                          multiple
                          value={filterValue}
                          onChange={(e) => handleColumnFilterChange(e.target.value as string[], column.id)}
                          renderValue={(selected) => (selected as string[]).map((value) => t(value)).join(", ")}
                        >
                          {column.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              <Checkbox checked={(filterValue as string[]).includes(option.value.toString())} />
                              <ListItemText primary={t(option.label)} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {(filterValue as string[]).length > 0 && (
                        <IconButton
                          size="small"
                          onClick={() => clearFilter(column.id)}
                          aria-label="Clear"
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  );
                case "radiobutton":
                  return (
                    <Box key={column.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FormControl component="fieldset" key={column.id} variant="outlined" size="small" sx={{ minWidth: 150 }}>
                        <Typography component="legend">{t(column.titleKey)}</Typography>
                        <RadioGroup
                          row
                          value={filterValue}
                          onChange={(e) => handleColumnFilterChange(e.target.value, column.id)}
                        >
                          {column.options?.map((option) => (
                            <FormControlLabel
                              key={option.value}
                              value={option.value}
                              control={<Radio size="small" />}
                              label={t(option.label)}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      {filterValue && (
                        <IconButton
                          size="small"
                          onClick={() => clearFilter(column.id)}
                          aria-label="Clear"
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  );
                default:
                  return null;
              }
            })}
            <Button
              variant="outlined"
              size="small"
              onClick={clearAllFilters}
              startIcon={<ClearAll />}
            >
              {t("Limpiar Filtros")}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Box
        sx={{
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          minHeight: minHeight,
          overflow: "auto",
        }}
      >
        <TableContainer component={Paper}>
          <Table {...props} style={{ tableLayout: "fixed", minWidth: "100%" }}>
            <colgroup>
              {showRowNumber && <col style={{ width: "50px" }} />}
              {filteredColumns.map((column) => (
                <col
                  key={column.id}
                  style={{
                    width:
                      typeof column.width === "number"
                        ? `${column.width}px`
                        : column.width,
                  }}
                />
              ))}
              {(handleView || handleEdit || handleDelete) && (
                <col style={{ width: "150px" }} />
              )}
            </colgroup>
            <TableHead>
              <TableRow>
                {showRowNumber && <TableCell>#</TableCell>}
                {filteredColumns.map((column) => (
                  <TableCell key={column.id}>{t(column.titleKey)}</TableCell>
                ))}
                {(handleView || handleEdit || handleDelete) && (
                  <TableCell>{t("Acciones")}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={
                      filteredColumns.length +
                      (showRowNumber ? 1 : 0) +
                      (handleView || handleEdit || handleDelete ? 1 : 0)
                    }
                    align="center"
                  >
                    {t("NO_DATA_AVAILABLE")}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, index) => (
                  <TableRow key={index}>
                    {showRowNumber && (
                      <TableCell>
                        {page * currentRowsPerPage + index + 1}
                      </TableCell>
                    )}
                    {filteredColumns.map((column) => {
                      const cellData = getNestedProperty(row, column.id);
                      let cellContent;

                      if (column.renderLogic) {
                        cellContent = column.renderLogic(row, column.titleKey, t);
                      } else {
                        switch (column.dataType) {
                          case "String":
                            cellContent = cellData !== undefined && cellData !== null ? cellData.toString() : "";
                            break;
                          case "Number":
                            cellContent = cellData !== undefined && cellData !== null ? cellData.toString() : "";
                            break;
                          case "Boolean":
                            cellContent = cellData !== undefined && cellData !== null ? (cellData ? "True" : "False") : "";
                            break;
                          case "Date":
                            cellContent = cellData !== undefined && cellData !== null ? new Date(cellData).toLocaleDateString() : "";
                            break;
                          default:
                            cellContent = cellData !== undefined && cellData !== null ? cellData.toString() : "";
                        }
                      }

                      return <TableCell key={column.id}>{cellContent}</TableCell>;
                    })}

                    {(handleView || handleEdit || handleDelete) && (
                      <TableCell>
                        {handleView && (
                          <IconButton
                            onClick={() => handleView(row)}
                            aria-label="View"
                            sx={{
                              color: "primary.main",
                              "&:hover": {
                                color: "primary.dark",
                              },
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        )}
                        {handleEdit && (
                          <IconButton
                            onClick={() => handleEdit(row)}
                            aria-label="Edit"
                            sx={{
                              color: "success.main",
                              "&:hover": {
                                color: "success.dark",
                              },
                            }}
                          >
                            <Edit />
                          </IconButton>
                        )}
                        {handleDelete && (
                          <IconButton
                            onClick={() => handleDelete(row)}
                            aria-label="Delete"
                            sx={{
                              color: "error.main",
                              "&:hover": {
                                color: "error.dark",
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePagination
        component="div"
        count={filteredRows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={currentRowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Box>
  );
};

export default TableComponent;