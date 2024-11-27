import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { IClassification } from '../../types/Transactions/Classification/classification.types';

/**
 * Servicio para crear una nueva clasificación.
 * @param classificationData - Los datos necesarios para crear la clasificación.
 * @returns Una promesa que resuelve con los datos de la clasificación creada.
 */
export const createClassification = async (
    classificationData: Omit<IClassification, 'classification_id' | 'created_at' | 'updated_at' | 'Transaction' | '_count'>
): Promise<IClassification> => {
    try {
        const response = await api.post<IClassification>('/classification', classificationData);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al crear la clasificación:', err.response?.data || err.message);
            throw new Error('Error creating classification');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
