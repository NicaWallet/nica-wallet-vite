import React from "react";
import { Box, Grid, MenuItem } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "../../components/InputField";

interface ITransactionFormProps {
  form: UseFormReturn<any>;
  categories: { category_id: number; name: string }[];
  subcategories: { subcategory_id: number; name: string }[];
  classifications: { classification_id: number; name: string }[];
  mode: "create" | "update";
  initialData?: {
    amount?: number;
    category_id?: number;
    subcategory_id?: number;
    classification_id?: number;
  };
}

export const TransactionForm: React.FC<ITransactionFormProps> = ({
  form,
  categories,
  subcategories,
  classifications,
  mode,
  initialData,
}) => {
  const { t } = useTranslation();
  const { register, formState, setValue } = form;
  const { errors } = formState;

  React.useEffect(() => {
    if (mode === "update" && initialData) {
      setValue("amount", initialData.amount || 0);
      setValue("category_id", initialData.category_id || "");
      setValue("subcategory_id", initialData.subcategory_id || "");
      setValue("classification_id", initialData.classification_id || "");
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
            {...register("amount")}
            label={t("AMOUNT")}
            type="number"
            errorText={errors.amount?.message as string}
            required
            size="large"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            {...register("category_id")}
            select
            label={t("CATEGORY")}
            errorText={errors.category_id?.message as string}
            required
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
            {...register("subcategory_id")}
            select
            label={t("SUBCATEGORY")}
            errorText={errors.subcategory_id?.message as string}
            required
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
            {...register("classification_id")}
            select
            label={t("CLASSIFICATION")}
            errorText={errors.classification_id?.message as string}
            required
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
      </Grid>
    </Box>
  );
};
