import axios from 'axios';
import api from '../api';
import { ICategory } from '../../types/Transactions/Categories/categories.types';

/**
 * Servicio para obtener una categoría por su ID.
 * @param categoryId - El ID de la categoría a obtener.
 * @returns Un objeto con los datos de la categoría.
 */
export const getCategoryById = async (categoryId: number): Promise<ICategory | null> => {
    try {
        const response = await api.get<ICategory>(`/category/${categoryId}`, { responseType: 'json' });
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al obtener la categoría:', err.response?.data || err.message);
        } else {
            console.error('An unexpected error occurred:', err);
        }
        return null;
    }
};
