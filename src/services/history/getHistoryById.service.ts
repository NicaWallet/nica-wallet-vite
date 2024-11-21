import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { IHistory } from '../../types/Transactions/History/history.types';

/**
 * Servicio para obtener un historial por su ID.
 * @param historyId - El ID del historial a obtener.
 * @returns Una promesa que resuelve con los datos del historial.
 */
export const getHistoryById = async (historyId: number): Promise<IHistory> => {
    if (!historyId) {
        throw new Error('Invalid history ID');
    }

    try {
        const response = await api.get<IHistory>(`/history/${historyId}`);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al obtener el historial:', err.response?.data || err.message);
            throw new Error('Error fetching history');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
