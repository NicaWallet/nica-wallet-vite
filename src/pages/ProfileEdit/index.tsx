import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import EditProfileForm, { EditProfileInputs } from "../../forms/EditProfileForm";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/users/getUserById.service";
import { updateUserProfile } from "../../services/users/updateUserProfile.service";

export const ProfileEdit = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [initialValues, setInitialValues] = useState<EditProfileInputs>({
        first_name: "",
        middle_name: "",
        first_surname: "",
        second_surname: "",
        phone_number: undefined,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const profile = await getUserProfile();

                setInitialValues({
                    first_name: profile.first_name || "",
                    middle_name: profile.middle_name || "",
                    first_surname: profile.first_surname || "",
                    second_surname: profile.second_surname || "",
                    phone_number: profile.phone_number || undefined,
                });
            } catch (err) {
                console.error(err);
                setError(t("ERROR_LOADING_PROFILE"));
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [t]);

    const handleSubmit = async (data: EditProfileInputs) => {
        try {
            setLoading(true);

            const normalizedData = {
                ...data,
                phone_number: data.phone_number ? data.phone_number.toString() : undefined,
                middle_name: data.middle_name || undefined,
                first_surname: data.first_surname || undefined,
                second_surname: data.second_surname || undefined,
            };

            await updateUserProfile(normalizedData);

            // Establecer mensaje de éxito
            setSuccess(t("PROFILE_UPDATED_SUCCESSFULLY"));

            // Opcional: Navegar después de un retraso
            setTimeout(() => navigate("/profile"), 2000);
        } catch (err) {
            console.error(err);
            setError(t("ERROR_UPDATING_PROFILE"));
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <PageHeader titleKey="PROFILE_EDIT_PAGE" />
            <EditProfileForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                loading={loading}
            />
            {error && (
                <ErrorSnackbar
                    open={!!error}
                    onClose={() => setError(null)}
                    message={error}
                    severity="error"
                />
            )}
            {success && (
                <ErrorSnackbar
                    open={!!success}
                    onClose={() => setSuccess(null)}
                    message={success}
                    severity="success"
                />
            )}
        </>

    );
};
