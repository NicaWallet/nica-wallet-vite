import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { IClassification } from '../../types/Transactions/Classification/classification.types';

/**
 * Servicio para obtener una clasificación por su ID.
 * @param classificationId - El ID de la clasificación a obtener.
 * @returns Una promesa que resuelve con los datos de la clasificación.
 */
export const getClassificationById = async (classificationId: number): Promise<IClassification> => {
    if (!classificationId) {
        throw new Error('Invalid classification ID');
    }

    try {
        const response = await api.get<IClassification>(`/classification/${classificationId}`);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al obtener la clasificación:', err.response?.data || err.message);
            throw new Error('Error fetching classification');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
