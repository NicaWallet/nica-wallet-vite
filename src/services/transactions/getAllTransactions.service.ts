import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '../api';
import { useTranslation } from 'react-i18next';
import { create } from 'zustand';
import { ITransactionWithDetails } from '../../types/Transactions/transactions.types';

interface UseGetAllTransactionsStore {
    transactions: ITransactionWithDetails[];
    setTransactions: (transactions: ITransactionWithDetails[]) => void;
}

const useTransactionStore = create<UseGetAllTransactionsStore>((set) => ({
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),
}));

export const useGetAllTransactions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { t } = useTranslation();
    const { transactions, setTransactions } = useTransactionStore();

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        setError(undefined);

        try {
            const response = await api.get<{ data: ITransactionWithDetails[] }>('/transaction/user', { responseType: 'json' });
            const data = response.data.data || [];
            setTransactions(data);
            return data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(t('TRANSACTIONS_FETCH_FAILED'));
            } else {
                setError(t('TRANSACTIONS_ERROR'));
            }
            return [];
        } finally {
            setLoading(false);
        }
    }, [setTransactions, t]);

    useEffect(() => {
        if (transactions.length === 0) fetchTransactions();
    }, [fetchTransactions, transactions.length]);

    return { transactions, fetchTransactions, loading, error };
};
