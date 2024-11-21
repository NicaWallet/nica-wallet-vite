import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { IClassification } from '../../types/Transactions/Classification/classification.types';

/**
 * Servicio para obtener todas las clasificaciones.
 * @returns Una promesa que resuelve con un array de clasificaciones.
 */
export const getAllClassifications = async (): Promise<IClassification[]> => {
    try {
        const response = await api.get<IClassification[]>('/classification');
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al obtener las clasificaciones:', err.response?.data || err.message);
            throw new Error('Error fetching classifications');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
