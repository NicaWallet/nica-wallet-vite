import React, { useEffect } from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../components/ButtonComponent";
import InputField from "../../components/InputField";

export type EditProfileInputs = {
    first_name: string;
    middle_name?: string | null;
    first_surname?: string | null;
    second_surname?: string | null;
    phone_number?: string | undefined;
};

interface EditProfileFormProps {
    initialValues: EditProfileInputs;
    onSubmit: (data: EditProfileInputs) => void;
    loading: boolean;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
    initialValues,
    onSubmit,
    loading,
}) => {
    const { t } = useTranslation();

    const validationSchema = yup.object().shape({
        first_name: yup.string().required(t("FIRST_NAME_REQUIRED")),
        middle_name: yup.string().nullable().notRequired(),
        first_surname: yup.string().nullable().notRequired(),
        second_surname: yup.string().nullable().notRequired(),
        phone_number: yup
            .string()
            .test("is-valid-phone", t("PHONE_INVALID"), (value) => {
                return value === undefined || value === "" || /^[0-9]+$/.test(value.toString());
            }),
    });

    const {
        handleSubmit,
        control,
        reset, // Método para actualizar los valores iniciales
        formState: { errors },
    } = useForm<EditProfileInputs>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues, // Carga inicial
    });

    // Actualizar valores iniciales cuando cambien
    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    return (
        <Paper
            elevation={4}
            sx={{
                padding: 4,
                borderRadius: 4,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                maxWidth: 500,
                margin: "0 auto",
                backgroundColor: "#ffffff",
            }}
        >
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                    {t("EDIT_PROFILE")}
                </Typography>
            </Box>
            <Divider sx={{ marginBottom: 3 }} />
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
            >
                <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            label={t("FIRST_NAME")}
                            error={!!errors.first_name}
                            helperText={
                                errors.first_name ? t(errors.first_name.message || "") : ""
                            }
                        />
                    )}
                />
                <Controller
                    name="middle_name"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            {...field}
                            margin="normal"
                            fullWidth
                            label={t("MIDDLE_NAME")}
                            error={!!errors.middle_name}
                            helperText={
                                errors.middle_name ? t(errors.middle_name.message || "") : ""
                            }
                        />
                    )}
                />
                <Controller
                    name="first_surname"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            {...field}
                            margin="normal"
                            fullWidth
                            label={t("FIRST_SURNAME")}
                            error={!!errors.first_surname}
                            helperText={
                                errors.first_surname
                                    ? t(errors.first_surname.message || "")
                                    : ""
                            }
                        />
                    )}
                />
                <Controller
                    name="second_surname"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            {...field}
                            margin="normal"
                            fullWidth
                            label={t("SECOND_SURNAME")}
                            error={!!errors.second_surname}
                            helperText={
                                errors.second_surname
                                    ? t(errors.second_surname.message || "")
                                    : ""
                            }
                        />
                    )}
                />
                <Controller
                    name="phone_number"
                    control={control}
                    render={({ field }) => (
                        <InputField
                            {...field}
                            margin="normal"
                            type="text"
                            fullWidth
                            label={t("PHONE_NUMBER")}
                            error={!!errors.phone_number}
                            helperText={
                                errors.phone_number ? t(errors.phone_number.message || "") : ""
                            }
                        />
                    )}
                />

                <ButtonComponent
                    label={t("SAVE_CHANGES")}
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                    SxProps={{
                        mt: 3,
                        mb: 2,
                        width: "100%",
                        "&:hover": { backgroundColor: "primary.dark" },
                    }}
                    isLoading={loading}
                    size="large"
                />
            </Box>
        </Paper>
    );
};

export default EditProfileForm;
