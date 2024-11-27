import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { ISubcategory } from '../../types/Transactions/Subcategories/subcategories.types';

/**
 * Servicio para actualizar una subcategoría existente.
 * @param subcategoryId - El ID de la subcategoría a actualizar.
 * @param subcategoryData - Los datos que se desean actualizar en la subcategoría.
 * @returns Una promesa que resuelve con los datos de la subcategoría actualizada.
 */
export const updateSubcategory = async (
    subcategoryId: number,
    subcategoryData: Partial<Omit<ISubcategory, 'subcategory_id' | 'created_at' | 'updated_at'>>
): Promise<ISubcategory> => {
    if (!subcategoryId) {
        throw new Error('Invalid subcategory ID');
    }

    try {
        const response = await api.put<ISubcategory>(`/subcategory/${subcategoryId}`, subcategoryData);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al actualizar la subcategoría:', err.response?.data || err.message);
            throw new Error('Error updating subcategory');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
