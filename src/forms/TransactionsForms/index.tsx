import React from "react";
import { Box, Grid, MenuItem } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "../../components/InputField";
import { ITransactionForm, TransactionType } from "../../types/Transactions/transactions.types";

interface ITransactionFormProps {
  form: UseFormReturn<ITransactionForm>;
  categories: { category_id: number; name: string }[];
  subcategories: { subcategory_id: number; name: string }[];
  classifications: { classification_id: number; name: string }[];
  mode: "create" | "update";
  initialData?: Partial<ITransactionForm>;
}

const TransactionForm: React.FC<ITransactionFormProps> = ({
  form,
  categories,
  subcategories,
  classifications,
  mode,
  initialData,
}) => {
  const { t } = useTranslation();
  const { watch, setValue, formState } = form;
  const { errors } = formState;

  React.useEffect(() => {
    if (mode === "update" && initialData) {
      setValue("amount", initialData.amount || 0);
      setValue("category_id", initialData.category_id || 0);
      setValue("subcategory_id", initialData.subcategory_id || 0);
      setValue("classification_id", initialData.classification_id || 0);
    }
  }, [mode, initialData, setValue]);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField
            label={t("AMOUNT")}
            type="number"
            value={watch("amount") || ""}
            onChange={(value) => setValue("amount", Number(value))}
            errorText={errors.amount?.message}
            size="large"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            label={t("CATEGORY")}
            select
            value={watch("category_id") || ""}
            onChange={(value) => setValue("category_id", Number(value))}
            errorText={errors.category_id?.message}
            size="large"
          >
            {categories.map((category) => (
              <MenuItem key={category.category_id} value={category.category_id}>
                {category.name}
              </MenuItem>
            ))}
          </InputField>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            label={t("SUBCATEGORY")}
            select
            value={watch("subcategory_id") || ""}
            onChange={(value) => setValue("subcategory_id", Number(value))}
            errorText={errors.subcategory_id?.message}
            size="large"
          >
            {subcategories.map((subcategory) => (
              <MenuItem
                key={subcategory.subcategory_id}
                value={subcategory.subcategory_id}
              >
                {subcategory.name}
              </MenuItem>
            ))}
          </InputField>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            label={t("CLASSIFICATION")}
            select
            value={watch("classification_id") || ""}
            onChange={(value) => setValue("classification_id", Number(value))}
            errorText={errors.classification_id?.message}
            size="large"
          >
            {classifications.map((classification) => (
              <MenuItem
                key={classification.classification_id}
                value={classification.classification_id}
              >
                {classification.name}
              </MenuItem>
            ))}
          </InputField>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            label={t("TRANSACTION_TYPE")}
            select
            value={watch("type") || ""}
            onChange={(value) => setValue("type", value as TransactionType)}
            errorText={errors.type?.message}
            size="large"
          >
            <MenuItem value="EXPENSE">{t("EXPENSE")}</MenuItem>
            <MenuItem value="INCOME">{t("INCOME")}</MenuItem>
          </InputField>
        </Grid>

      </Grid>
    </Box>
  );
};

export default TransactionForm;
