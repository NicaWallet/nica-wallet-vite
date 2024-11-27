import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios o api personalizada
import { IBudget } from '../../types/Transactions/Budgets/budgets.types';

/**
 * Servicio para crear un nuevo presupuesto.
 * @param budgetData - Los datos necesarios para crear el presupuesto.
 * @returns Una promesa que resuelve con los datos del presupuesto creado.
 */
export const createBudget = async (budgetData: Omit<IBudget, 'budget_id' | 'created_at' | 'updated_at'>): Promise<IBudget> => {
    try {
        const response = await api.post<IBudget>('/budget', budgetData);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al crear el presupuesto:', err.response?.data || err.message);
            throw new Error('Error creating budget');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
