import { UserResponseDto } from "../../types/user/user.types";
import api from "../api";

/**
 * Fetches user information based on the current user's role (admin or regular user).
 * If the user is an admin, all data is returned; otherwise, limited data is provided.
 *
 * @returns {Promise<UserResponseDto>} The user data as per the backend response.
 * @throws Will throw an error if the request fails.
 */
export const getUserProfile = async (): Promise<UserResponseDto> => {
    try {
        const response = await api.get<UserResponseDto>("/users/user");
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};
