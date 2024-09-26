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

export type AuthResponse = {
    message: string;
    access_token: string;
    user: User;
}
