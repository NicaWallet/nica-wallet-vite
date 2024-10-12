/**
 * User is the data structure returned by the API when fetching user information.
 * This data structure is used to handle the response from the API and extract the necessary information.
 * 
 * @typedef {Object} User
 * @property {number} user_id - The ID of the user.
 * @property {string} first_name - The first name of the user.
 * @property {string} [middle_name] - The middle name of the user.
 * @property {string} first_surname - The first surname of the user.
 * @property {string} [second_surname] - The second surname of the user.
 * @property {string} email - The email address of the user.
 * @property {string} phone_number - The phone number of the user.
 * @property {string} birthdate - The birthdate of the user in ISO format (YYYY-MM-DD).
 * @property {string} created_at - The creation date of the user in ISO format (YYYY-MM-DD).
 * @property {string} updated_at - The last update date of the user in ISO format (YYYY-MM-DD).
 * 
 */
export interface User {
    user_id: number;
    first_name: string;
    middle_name?: string;
    first_surname: string;
    second_surname?: string;
    email: string;
    phone_number: string;
    birthdate: string; // ISO 8601 date string
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

/**
 * AuthResponse is the data structure returned by the API when authenticating a user.
 * This data structure is used to handle the response from the API and extract the necessary information.
 * 
 * @typedef {Object} AuthResponse
 * @property {string} message - The message returned by the API.
 * @property {string} access_token - The access token returned by the API.
 * @property {User} user - The user object returned by the API.
 * 
 */
export type AuthResponse = {
    message: string;
    access_token: string;
    user: User;
}

/**
 * RegisterFormData is the data structure used for the registration form.
 * This data structure is validated and handled by react-hook-form and Yup.
 *
 * @typedef {Object} RegisterFormData
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} confirmEmail - Confirmation of the email address.
 * @property {string} password - The password of the user.
 * @property {string} confirmPassword - Confirmation of the password.
 * @property {Date} birthdate - The birthdate of the user.
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
 *
 * @typedef {Object} RegisterPayload
 * @property {string} first_name - The first name of the user.
 * @property {string} first_surname - The first surname of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} birthdate - The birthdate of the user in ISO format (YYYY-MM-DD).
 * @property {number} [role_id] - The role ID to assign to the user. Optional, default is 1 (normal user).
 */
export interface RegisterPayload {
    first_name: string;
    first_surname: string;
    email: string;
    password: string;
    birthdate: string;
    role_id?: number;
}
