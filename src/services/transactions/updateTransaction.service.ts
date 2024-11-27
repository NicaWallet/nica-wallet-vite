import api from '../api';
import { ITransactionForm } from '../../types/Transactions/transactions.types';

export const updateTransaction = async (transactionId: number, transactionData: ITransactionForm): Promise<boolean> => {
    try {
        await api.put(`/transaction/${transactionId}`, transactionData);
        return true;
    } catch (err) {
        console.error('Error updating transaction:', err);
        return false;
    }
};
