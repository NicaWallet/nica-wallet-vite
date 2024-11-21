import React, { useEffect, useRef } from "react";
import { Box, Grid, MenuItem } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import InputField from "../../components/InputField";
import RangeDatePicker from "../../components/RangeDatePicker";
import { IBudgetById } from "../../types/Transactions/Budgets/budgets.types";

interface IBudgetFormProps {
    form: UseFormReturn<{ amount: number; category_id: number; start_date: string; end_date: string }>;
    categories: { category_id: number; name: string }[];
    mode: "create" | "update";
    initialData?: Partial<IBudgetById>;
}

export const BudgetForm: React.FC<IBudgetFormProps> = ({
    form,
    categories,
    mode,
    initialData,
}) => {
    const { t } = useTranslation();
    const { register, formState, setValue, watch, reset } = form;
    const { errors } = formState;
    const isInitialMount = useRef(true);

    // States for handling date changes
    const [startDate, endDate] = watch(["start_date", "end_date"]);

    useEffect(() => {
        if (mode === "update" && initialData && isInitialMount.current) {
            reset({
                category_id: initialData.category_id || 0,
                amount: initialData.amount || 0,
                start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().split("T")[0] : "",
                end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().split("T")[0] : "",
            });
            isInitialMount.current = false; // Evita que se vuelva a ejecutar el reset
        }
    }, [mode, initialData, reset]);

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("start_date", e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue("end_date", e.target.value);
    };

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
                        {...register("amount", {
                            required: t("REQUIRED_FIELD"),
                            valueAsNumber: true, // Ensure the input value is treated as a number
                        })}
                        label={t("AMOUNT")}
                        type="number"
                        value={watch("amount")} // Ensure the value is updated and displayed
                        onChange={(e) => setValue("amount", Number(e.target.value))}
                        errorText={errors.amount?.message as string}
                        required
                        size="large"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField
                        {...register("category_id", { required: t("REQUIRED_FIELD") })}
                        select
                        label={t("CATEGORY")}
                        value={watch("category_id")} // Ensure the value is updated and displayed
                        onChange={(e) => setValue("category_id", Number(e.target.value))}
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
                <Grid item xs={12}>
                    <RangeDatePicker
                        labelStart={t("START_DATE")}
                        labelEnd={t("END_DATE")}
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={handleStartDateChange}
                        onEndDateChange={handleEndDateChange}
                        size="large"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
