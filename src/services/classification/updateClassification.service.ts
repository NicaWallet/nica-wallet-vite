import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios personalizada
import { IClassification } from '../../types/Transactions/Classification/classification.types';

/**
 * Servicio para actualizar una clasificación existente.
 * @param classificationId - El ID de la clasificación a actualizar.
 * @param classificationData - Los datos que se desean actualizar en la clasificación.
 * @returns Una promesa que resuelve con los datos de la clasificación actualizada.
 */
export const updateClassification = async (
    classificationId: number,
    classificationData: Partial<Omit<IClassification, 'classification_id' | 'created_at' | 'updated_at' | 'Transaction' | '_count'>>
): Promise<IClassification> => {
    if (!classificationId) {
        throw new Error('Invalid classification ID');
    }

    try {
        const response = await api.put<IClassification>(`/classification/${classificationId}`, classificationData);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al actualizar la clasificación:', err.response?.data || err.message);
            throw new Error('Error updating classification');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
