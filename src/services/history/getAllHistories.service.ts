import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { IHistory } from '../../types/Transactions/History/history.types';

/**
 * Servicio para obtener todos los historiales.
 * @returns Una promesa que resuelve con un array de historiales.
 */
export const getAllHistories = async (): Promise<IHistory[]> => {
    try {
        const response = await api.get<IHistory[]>('/history');
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al obtener los historiales:', err.response?.data || err.message);
            throw new Error('Error fetching histories');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
