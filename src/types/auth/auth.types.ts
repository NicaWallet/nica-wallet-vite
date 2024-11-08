/**
 * User is the data structure returned by the API when fetching user information.
 * This data structure is used to handle the response from the API and extract the necessary information.
 */
export interface User {
    user_id: number;
    first_name: string;
    middle_name?: string | null;
    first_surname: string;
    second_surname?: string | null;
    email: string;
    phone_number?: string | null;
    birthdate: string; // ISO 8601 date string
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    userRoles: UserRole[];
}

/**
 * UserRole represents the roles associated with a user.
 */
export interface UserRole {
    user_id: number;
    role_id: number;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    role: Role;
}

/**
 * Role represents the structure of a role in the system.
 */
export interface Role {
    role_id: number;
    role_name: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

/**
 * AuthResponse is the data structure returned by the API when authenticating a user.
 * This data structure is used to handle the response from the API and extract the necessary information.
 */
export type AuthResponse = {
    message: string;
    access_token: string;
    user: User;
}

/**
 * RegisterFormData is the data structure used for the registration form.
 * This data structure is validated and handled by react-hook-form and Yup.
 */
export interface RegisterFormData {
    first_name: string;
    last_name: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    birthdate: Date;
}

/**
 * RegisterPayload is the data structure used for the API request payload when registering a user.
 * This data structure matches the API requirements and is sent to the backend.
 */
export interface RegisterPayload {
    first_name: string;
    first_surname: string;
    email: string;
    password: string;
    birthdate: string; // ISO 8601 date string
    role_id?: number; // Optional, default is 1 (normal user)
}
