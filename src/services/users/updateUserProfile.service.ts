import { UserResponseDto } from "../../types/user/user.types";
import api from "../api";

/**
 * Updates the user's profile information.
 *
 * @param {Partial<UserResponseDto>} data - The updated profile information.
 * @returns {Promise<void>} Resolves when the profile is successfully updated.
 * @throws Will throw an error if the update fails.
 */
export const updateUserProfile = async (data: Partial<UserResponseDto>): Promise<void> => {
    try {
        await api.patch("/users/update-profile", data); // Endpoint para actualizar el perfil
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
};
