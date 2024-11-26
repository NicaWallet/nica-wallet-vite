import { BaseEntity } from "../common.types";
import { ICategoryById } from "./Categories/categories.types";
import { IClassification } from "./Classification/classification.types";
import { IHistory } from "./History/history.types";
import { ISubcategory } from "./Subcategories/subcategories.types";

export type TransactionType = 'INCOME' | 'EXPENSE';

export type ITransactionBase = BaseEntity & {
  transaction_id: number;
  amount: number;
  date: string;
  type: TransactionType;
};

export type ITransaction = ITransactionBase & {
  user_id: number;
  category_id: number;
  subcategory_id: number;
  classification_id: number;
  recurring_transaction_id: number | null;
};

export type ITransactionWithDetails = ITransaction & {
  category: ICategoryById;
  subcategory: ISubcategory;
  classification: IClassification;
  histories: IHistory[];
};

export type ITransactionForm = {
  amount: number;
  category_id: number;
  subcategory_id: number;
  classification_id: number;
  recurring_transaction_id?: number | null;
  type: TransactionType;
  date?: string; // Asegúrate de que sea string para cumplir con la compatibilidad
};