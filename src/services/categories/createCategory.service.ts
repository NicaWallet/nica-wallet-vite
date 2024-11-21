import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios o api personalizada
import { ICategory, ICategoryForm } from '../../types/Transactions/Categories/categories.types';

/**
 * Servicio para crear una nueva categoría.
 * @param categoryData - Los datos necesarios para crear la categoría.
 * @returns Una promesa que resuelve con los datos de la categoría creada.
 */
export const createCategory = async (categoryData: ICategoryForm): Promise<ICategory> => {
    try {
        const response = await api.post<ICategory>('/categories', categoryData);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al crear la categoría:', err.response?.data || err.message);
            throw new Error('Error creating category');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
