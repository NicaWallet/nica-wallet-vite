import * as Yup from "yup";
import { TFunction } from "i18next";

/**
 * Generates a Yup validation schema for the registration form.
 * 
 * @param {TFunction} t - The translation function to provide localized error messages.
 * @returns {Yup.ObjectSchema} - The Yup validation schema.
 */
export const getRegisterSchema = (t: TFunction) => {
    return Yup.object().shape({
        first_name: Yup.string().required(t("FIRST_NAME_REQUIRED")),
        last_name: Yup.string().required(t("LAST_NAME_REQUIRED")),
        birthdate: Yup.date()
            .required(t("BIRTH_DATE_REQUIRED"))
            .typeError(t("BIRTH_DATE_INVALID"))
            .max(new Date(), t("BIRTH_DATE_IN_FUTURE")),
        email: Yup.string()
            .email(t("EMAIL_INVALID"))
            .required(t("EMAIL_REQUIRED")),
        confirmEmail: Yup.string()
            .oneOf([Yup.ref("email")], t("EMAILS_DO_NOT_MATCH"))
            .required(t("CONFIRM_EMAIL_REQUIRED")),
        password: Yup.string()
            .required(t("PASSWORD_REQUIRED"))
            .min(8, t("PASSWORD_TOO_SHORT")),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], t("PASSWORDS_DO_NOT_MATCH"))
            .required(t("CONFIRM_PASSWORD_REQUIRED")),
    });
};
