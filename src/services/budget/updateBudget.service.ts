import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios o api personalizada
import { IBudget } from '../../types/Transactions/Budgets/budgets.types';

/**
 * Servicio para actualizar un presupuesto existente.
 * @param budgetId - El ID del presupuesto a actualizar.
 * @param budgetData - Los datos que se desean actualizar en el presupuesto.
 * @returns Una promesa que resuelve con los datos del presupuesto actualizado.
 */
export const updateBudget = async (
    budgetId: number,
    budgetData: Partial<Omit<IBudget, 'budget_id' | 'created_at' | 'updated_at'>>
): Promise<IBudget> => {
    if (!budgetId) {
        throw new Error('Invalid budget ID');
    }

    try {
        const response = await api.put<IBudget>(`/budget/${budgetId}`, budgetData);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al actualizar el presupuesto:', err.response?.data || err.message);
            throw new Error('Error updating budget');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
