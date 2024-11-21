import { create } from 'zustand';
import { IBudgetById } from '../../types/Transactions/Budgets/budgets.types';

interface BudgetState {
    budget: IBudgetById | null;
    setBudgetData: (data: IBudgetById) => void;
    clearBudgetData: () => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
    budget: null,
    setBudgetData: (data) => set({ budget: data }),
    clearBudgetData: () => set({ budget: null }),
}));
