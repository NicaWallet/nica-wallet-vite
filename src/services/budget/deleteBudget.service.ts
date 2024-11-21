import api from "../api";

export const deleteBudget = async (budgetId: number): Promise<boolean> => {
    try {
        await api.delete(`/budget/${budgetId}`);
        return true; // Indica éxito
    } catch (err) {
        console.error("Error deleting budget:", err);
        return false; // Indica falla
    }
};
