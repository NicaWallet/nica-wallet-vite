import { create } from "zustand";

// Estado global para manejar la visibilidad de secciones
interface DashboardState {
    visibleSections: Record<string, boolean>;
    toggleSection: (section: string) => void;
}

type VisibleSections = Record<string, boolean>;


export const useDashboardStore = create<DashboardState>((set: (partial: Partial<DashboardState> | ((state: DashboardState) => Partial<DashboardState>)) => void) => ({
    visibleSections: {
        latestTransactions: true,
        expensesByCategory: true,
        goalsProgress: true,
        incomeVsExpenses: true,
    } as VisibleSections,
    toggleSection: (section: string) =>
        set((state: DashboardState) => ({
            visibleSections: {
                ...state.visibleSections,
                [section]: !state.visibleSections[section],
            },
        })),
}));
