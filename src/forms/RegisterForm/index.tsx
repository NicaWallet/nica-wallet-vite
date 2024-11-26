import React from "react";
import { Grid } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RegisterFormData } from "../../types/auth/auth.types";
import InputField from "../../components/InputField";
import DatePickerComponent from "../../components/DatePickerComponent";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";

interface RegisterFormProps {
  form: UseFormReturn<RegisterFormData>;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordStrengthVisible: boolean;
  passwordStrength: number;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  form,
  handlePasswordChange,
  passwordStrengthVisible,
  passwordStrength,
}) => {
  const { t } = useTranslation();
  const { formState, setValue, watch } = form;
  const { errors } = formState;

  const birthdate = watch("birthdate");

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField
            label={t("FIRST_NAME")}
            value={watch("first_name")}
            onChange={(value) => setValue("first_name", value as string)}
            errorText={errors.first_name?.message as string}
            size="medium"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label={t("LAST_NAME")}
            value={watch("last_name")}
            onChange={(value) => setValue("last_name", value as string)}
            errorText={errors.last_name?.message as string}
            size="medium"
          />
        </Grid>
        <Grid item xs={12}>
          <DatePickerComponent
            label={t("BIRTH_DATE")}
            value={birthdate ? birthdate.toISOString().split("T")[0] : ""}
            onChange={(value: string) => setValue("birthdate", new Date(value))}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            label={t("EMAIL_ADDRESS_PLACEHOLDER")}
            value={watch("email")}
            onChange={(value) => setValue("email", value as string)}
            errorText={errors.email?.message as string}
            size="medium"
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            label={t("CONFIRM_EMAIL_ADDRESS")}
            value={watch("confirmEmail")}
            onChange={(value) => setValue("confirmEmail", value as string)}
            errorText={errors.confirmEmail?.message as string}
            size="medium"
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            label={t("PASSWORD_PLACEHOLDER")}
            value={watch("password")}
            onChange={(value) => {
              setValue("password", value as string);
              handlePasswordChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
            }}
            errorText={errors.password?.message as string}
            type="password"
            size="medium"
          />
          {passwordStrengthVisible && (
            <PasswordStrengthMeter strength={passwordStrength} />
          )}
        </Grid>
        <Grid item xs={12}>
          <InputField
            label={t("CONFIRM_PASSWORD_PLACEHOLDER")}
            value={watch("confirmPassword")}
            onChange={(value) => setValue("confirmPassword", value as string)}
            errorText={errors.confirmPassword?.message as string}
            type="password"
            size="medium"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterForm;