export interface TransactionDetailType {
  transaction_id: number;
  user_id: number;
  category_id: number;
  subcategory_id: number;
  classification_id: number;
  amount: number;
  date: Date;
  created_at: Date;
  updated_at: Date;
  category: Category;
  histories: any[];
  classification: Classification;
  user: User;
}

export interface Category {
  category_id: number;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  subcategory_id: number;
  name: string;
}

export interface Classification {
  classification_id: number;
  name: string;
}

export interface User {
  user_id: number;
  first_name: string;
  first_surname: string;
  email: string;
  userRoles: UserRole[];
}

export interface UserRole {
  role: Role;
}

export interface Role {
  role_name: string;
}
