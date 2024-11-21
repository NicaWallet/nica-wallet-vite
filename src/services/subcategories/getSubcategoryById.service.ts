import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { ISubcategory } from '../../types/Transactions/Subcategories/subcategories.types';

/**
 * Servicio para obtener una subcategoría por su ID.
 * @param subcategoryId - El ID de la subcategoría a obtener.
 * @returns Una promesa que resuelve con los datos de la subcategoría.
 */
export const getSubcategoryById = async (subcategoryId: number): Promise<ISubcategory> => {
    if (!subcategoryId) {
        throw new Error('Invalid subcategory ID');
    }

    try {
        const response = await api.get<ISubcategory>(`/subcategory/${subcategoryId}`);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al obtener la subcategoría:', err.response?.data || err.message);
            throw new Error('Error fetching subcategory');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
