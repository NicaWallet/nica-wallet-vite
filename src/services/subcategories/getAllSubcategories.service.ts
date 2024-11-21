import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { ISubcategory } from '../../types/Transactions/Subcategories/subcategories.types';

/**
 * Servicio para obtener todas las subcategorías del usuario.
 * @returns Una promesa que resuelve con un array de subcategorías.
 */
export const getAllSubcategories = async (): Promise<ISubcategory[]> => {
    try {
        const response = await api.get<ISubcategory[]>('/subcategory');
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al obtener las subcategorías:', err.response?.data || err.message);
            throw new Error('Error fetching subcategories');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
