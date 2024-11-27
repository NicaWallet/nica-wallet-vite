import axios from 'axios';
import api from '../api'; // Importa tu instancia de Axios o api personalizada
import { ITransaction, ITransactionForm } from '../../types/Transactions/transactions.types';

/**
 * Servicio para crear una nueva categoría.
 * @param transactionData - Los datos necesarios para crear la categoría.
 * @returns Una promesa que resuelve con los datos de la categoría creada.
 */
export const createTransaction = async (transactionData: ITransactionForm): Promise<ITransaction> => {
    try {
        const response = await api.post<ITransaction>('/transaction', transactionData);
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al crear la categoría:', err.response?.data || err.message);
            throw new Error('Error creating transaction');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
