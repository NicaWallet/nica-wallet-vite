import axios from 'axios';
import api from '../api';
import { ITransactionWithDetails } from '../../types/Transactions/transactions.types';

export const getTransactionById = async (transactionId: number): Promise<ITransactionWithDetails | null> => {
    try {
        const response = await api.get<ITransactionWithDetails>(`/transaction/${transactionId}`, { responseType: 'json' });
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error('Error al obtener la transacción:', err.response?.data || err.message);
        } else {
            console.error('An unexpected error occurred:', err);
        }
        return null;
    }
};
