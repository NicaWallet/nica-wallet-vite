import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios o api personalizada
import { ICategory } from '../../types/Transactions/Categories/categories.types';

/**
 * Servicio para actualizar una categoría existente.
 * @param categoryId - El ID de la categoría a actualizar.
 * @param categoryData - Los datos que se desean actualizar en la categoría.
 * @returns Una promesa que resuelve con los datos de la categoría actualizada.
 */
export const updateCategory = async (
    categoryId: number,
    categoryData: Partial<Omit<ICategory, 'category_id' | 'created_at' | 'updated_at' | 'user_id'>>
): Promise<ICategory> => {
    if (!categoryId) {
        throw new Error('Invalid category ID');
    }

    try {
        const response = await api.put<ICategory>(`/categories/${categoryId}`, categoryData);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al actualizar la categoría:', err.response?.data || err.message);
            throw new Error('Error updating category');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
