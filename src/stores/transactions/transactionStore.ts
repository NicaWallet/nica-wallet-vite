import { create } from "zustand"; // Asegúrate de que la importación sea compatible con tu versión de Zustand.

interface TransactionData {
  amount: number;
  category_id: number;
  subcategory_id: number;
  classification_id: number;
}

interface TransactionStore {
  transactionData: TransactionData | null;
  setTransactionData: (data: Partial<TransactionData>) => void;
  clearTransactionData: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactionData: null,
  setTransactionData: (data: Partial<TransactionData>) =>
    set((state: TransactionStore) => ({
      transactionData: { ...state.transactionData, ...data } as TransactionData,
    })),
  clearTransactionData: () => set({ transactionData: null }),
}));
