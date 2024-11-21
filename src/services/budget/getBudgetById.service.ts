import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios o api personalizada
import { IBudgetById } from '../../types/Transactions/Budgets/budgets.types';

/**
 * Servicio para obtener un presupuesto por su ID.
 * @param budgetId - El ID del presupuesto a obtener.
 * @returns Una promesa que resuelve con los datos del presupuesto o lanza un error.
 */
const getBudgetById = async (budgetId: number): Promise<IBudgetById> => {
    if (!budgetId) {
        throw new Error('Invalid budget ID');
    }

    try {
        const response = await api.get<IBudgetById>(`/budget/${budgetId}`);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al obtener el presupuesto:', err.response?.data || err.message);
            throw new Error('Error fetching budget data');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export default getBudgetById;
