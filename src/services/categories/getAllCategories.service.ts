import { ICategory } from '../../types/Transactions/Categories/categories.types';
import api from '../api'; // Importa tu instancia de Axios configurada
/**
 * Servicio para obtener todas las categorías del usuario.
 * @returns Una promesa que resuelve con un array de categorías.
 */
export const getAllCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await api.get<ICategory[]>('/category/user', { responseType: 'json' });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw new Error('Error fetching categories');
    }
};
