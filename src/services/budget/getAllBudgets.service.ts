import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '../api';
import { useTranslation } from 'react-i18next';
import { create } from 'zustand';
import { IBudget } from '../../types/Transactions/Budgets/budgets.types';

interface UseGetAllBudgetsStore {
    budgets: IBudget[];
    setBudgets: (budgets: IBudget[]) => void;
}

// Zustand store para manejar los presupuestos globalmente
const useBudgetStore = create<UseGetAllBudgetsStore>((set) => ({
    budgets: [],
    setBudgets: (budgets) => set({ budgets }),
}));

/**
 * Custom hook para obtener todos los presupuestos de un usuario.
 * @returns Un objeto con los datos de los presupuestos, el estado de carga, el estado de error y la función fetchBudgets.
 */
export const useGetAllBudgets = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { t } = useTranslation();
    const { budgets, setBudgets } = useBudgetStore();

    const fetchBudgets = useCallback(async () => {
        setLoading(true);
        setError(undefined);

        try {
            const response = await api.get<IBudget[]>('/budget/user', { responseType: 'json' });
            // console.log("get all budgets response", response.data);
            setBudgets(response.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(t('BUDGETS_FETCH_FAILED'));
            } else {
                setError(t('BUDGETS_ERROR'));
            }
        } finally {
            setLoading(false);
        }
    }, [setBudgets, t]);

    useEffect(() => {
        if (budgets.length === 0) fetchBudgets();
    }, [fetchBudgets, budgets.length]);

    return { budgets, fetchBudgets, loading, error };
};
