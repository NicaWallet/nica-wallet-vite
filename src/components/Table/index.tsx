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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ColumnConfig } from "./columnConfig";
import { useTranslation } from "react-i18next";
import { ClearAll, Clear } from "@mui/icons-material";

type ColumnFilterValue = string | string[] | number | number[] | null;

export interface TableComponentProps extends TableProps {
  columns: ColumnConfig[];
  rows: Array<Record<string, unknown>>;
  variant?: "default" | "compact" | "striped" | "bordered";
  sx?: SxProps<Theme>;
  columnOrder?: string[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  showRowNumber?: boolean;
  maxWidth?: number | string;
  maxHeight?: number | string;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  rows,
  variant = "default",
  sx = {},
  columnOrder,
  rowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
  showRowNumber = false,
  maxWidth = "100%",
  maxHeight = 500,
  ...props
}) => {
  const { t } = useTranslation();

  function validateUniqueIds(columns: ColumnConfig[]): void {
    const idSet = new Set<string>();
    for (const column of columns) {
      if (idSet.has(column.id)) {
        throw new Error(
          `ID duplicado encontrado en columnConfig: ${column.id}`
        );
      }
      idSet.add(column.id);
    }
  }

  validateUniqueIds(columns);

  const [searchQuery, setSearchQuery] = useState("");
  const [columnFilters, setColumnFilters] = useState<{
    [key: string]: ColumnFilterValue;
  }>({});
  const [page, setPage] = useState(0);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);

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
  rows.forEach((row) => {
    Object.keys(row).forEach((key) => {
      dataKeys.add(key);
    });
  });

  const orderedColumns = columnOrder
    ? (columnOrder
        .map((id) => columns.find((col) => col.id === id))
        .filter(Boolean) as ColumnConfig[])
    : [...columns].sort((a, b) => a.titleKey.localeCompare(b.titleKey));

  const filteredColumns = orderedColumns.filter((column) =>
    dataKeys.has(column.id)
  );

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
      const cellValue = row[column.id];

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

  return (
    <Box sx={{ ...combinedStyles }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
              label="Buscar"
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
              if (!column.filterType) return null;
              const filterValue = columnFilters[column.id] || "";

              switch (column.filterType) {
                case "search":
                  return (
                    <Box
                      key={column.id}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <TextField
                        key={column.id}
                        label={column.titleKey}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 150 }}
                        value={filterValue}
                        onChange={(e) =>
                          handleColumnFilterChange(e.target.value, column.id)
                        }
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
                    <Box
                      key={column.id}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <FormControl
                        key={column.id}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 150 }}
                      >
                        <InputLabel>{column.titleKey}</InputLabel>
                        <Select
                          label={column.titleKey}
                          value={filterValue}
                          onChange={(e) =>
                            handleColumnFilterChange(e.target.value, column.id)
                          }
                          endAdornment={
                            filterValue && (
                              <IconButton
                                size="small"
                                onClick={() => clearFilter(column.id)}
                                aria-label="Clear"
                              >
                                <Clear fontSize="small" />
                              </IconButton>
                            )
                          }
                        >
                          {column.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  );
                case "multiselect":
                  return (
                    <Box
                      key={column.id}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <FormControl
                        key={column.id}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 150 }}
                      >
                        <InputLabel>{column.titleKey}</InputLabel>
                        <Select
                          label={column.titleKey}
                          multiple
                          value={filterValue}
                          onChange={(e) =>
                            handleColumnFilterChange(
                              e.target.value as string[],
                              column.id
                            )
                          }
                          renderValue={(selected) =>
                            (selected as string[]).join(", ")
                          }
                        >
                          {column.options?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              <Checkbox
                                checked={
                                  (filterValue as string[]).indexOf(
                                    option.value.toString()
                                  ) > -1
                                }
                              />
                              <ListItemText primary={option.label} />
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
                    <Box
                      key={column.id}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <FormControl
                        component="fieldset"
                        key={column.id}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 150 }}
                      >
                        <RadioGroup
                          row
                          value={filterValue}
                          onChange={(e) =>
                            handleColumnFilterChange(e.target.value, column.id)
                          }
                        >
                          {column.options?.map((option) => (
                            <FormControlLabel
                              key={option.value}
                              value={option.value}
                              control={<Radio size="small" />}
                              label={option.label}
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
              Limpiar Filtros
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Box
        sx={{
          maxWidth: maxWidth,
          maxHeight: maxHeight,
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
            </colgroup>
            <TableHead>
              <TableRow>
                {showRowNumber && <TableCell>#</TableCell>}
                {filteredColumns.map((column) => (
                  <TableCell key={column.id}>{column.titleKey}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, index) => (
                <TableRow key={index}>
                  {showRowNumber && (
                    <TableCell>
                      {page * currentRowsPerPage + index + 1}
                    </TableCell>
                  )}
                  {filteredColumns.map((column) => {
                    const cellData = row[column.id];
                    let cellContent;

                    if (column.renderLogic) {
                      cellContent = column.renderLogic(row, column.titleKey, t);
                    } else {
                      switch (column.dataType) {
                        case "String":
                          cellContent =
                            cellData !== undefined && cellData !== null
                              ? cellData.toString()
                              : "";
                          break;
                        case "Number":
                          cellContent =
                            cellData !== undefined && cellData !== null
                              ? cellData.toString()
                              : "";
                          break;
                        case "Boolean":
                          cellContent =
                            cellData !== undefined && cellData !== null
                              ? cellData
                                ? "True"
                                : "False"
                              : "";
                          break;
                        case "Date":
                          cellContent =
                            cellData !== undefined && cellData !== null
                              ? new Date(
                                  cellData as string
                                ).toLocaleDateString()
                              : "";
                          break;
                        default:
                          cellContent =
                            cellData !== undefined && cellData !== null
                              ? cellData.toString()
                              : "";
                      }
                    }

                    return <TableCell key={column.id}>{cellContent}</TableCell>;
                  })}
                </TableRow>
              ))}
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
