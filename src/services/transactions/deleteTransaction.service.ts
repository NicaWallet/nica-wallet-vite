import api from '../api';

export const deleteTransaction = async (transactionId: number): Promise<boolean> => {
    try {
        await api.delete(`/transaction/${transactionId}`);
        return true;
    } catch (err) {
        console.error('Error deleting transaction:', err);
        return false;
    }
};
