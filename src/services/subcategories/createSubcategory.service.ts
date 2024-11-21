import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { ISubcategory } from '../../types/Transactions/Subcategories/subcategories.types';

/**
 * Servicio para crear una nueva subcategoría.
 * @param subcategoryData - Los datos necesarios para crear la subcategoría.
 * @returns Una promesa que resuelve con los datos de la subcategoría creada.
 */
export const createSubcategory = async (
    subcategoryData: Omit<ISubcategory, 'subcategory_id' | 'created_at' | 'updated_at'>
): Promise<ISubcategory> => {
    try {
        const response = await api.post<ISubcategory>('/subcategory', subcategoryData);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al crear la subcategoría:', err.response?.data || err.message);
            throw new Error('Error creating subcategory');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
