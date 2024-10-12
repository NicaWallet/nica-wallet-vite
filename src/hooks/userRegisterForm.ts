import { useForm, SubmitHandler } from 'react-hook-form';
import { useRegister } from '../services/auth/register.service';
import { useNavigate } from 'react-router-dom';

interface RegisterFormInputs {
    first_name: string;
    last_name: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    birthdate: string;
}

/**
 * Custom hook for handling user registration form.
 * 
 * @returns {object} - Object containing form methods and state.
 */
export const useRegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
    const { register: registerUser, loading, error } = useRegister();
    const navigate = useNavigate();

    /**
     * Handles form submission.
     * 
     * @param {RegisterFormInputs} data - Form data.
     */
    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (data.email !== data.confirmEmail) {
            alert("Emails do not match!");
            return;
        }

        const registerData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            birthdate: data.birthdate
        };

        const response = await registerUser(registerData);
        if (response) {
            navigate('/auth/login');
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        loading,
        error
    };
};
