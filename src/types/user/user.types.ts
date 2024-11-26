export interface RoleDto {
    role_name: string;
}

export interface UserRoleDto {
    role?: RoleDto;
    user_id: number;
    role_id: number;
}

export interface CountDto {
    addresses?: number;
    budgets?: number;
    goals?: number;
    recurringTransactions?: number;
    Category?: number;
    Subcategory?: number;
    transactions?: number;
    notifications?: number;
}

export interface Address {
    address_id: number;
    user_id: number;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    address_type: string;
    created_at: string;
    updated_at: string;
}

export interface BillingInfo {
    billing_id: number;
    user_id: number;
    credit_card_number: string;
    billing_address_id: number;
    created_at: string;
    updated_at: string;
}

export interface BankDetail {
    bank_id: number;
    user_id: number;
    account_number: string;
    bank_name: string;
    account_type: string;
    created_at: string;
    updated_at: string;
}

export interface Budget {
    budget_id: number;
    user_id: number;
    category_id: number;
    amount: number;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

export interface Goal {
    goal_id: number;
    user_id: number;
    description: string;
    target_amount: number;
    current_amount: number;
    deadline: string;
    created_at: string;
    updated_at: string;
}

export interface Income {
    income_id: number;
    user_id: number;
    amount: number;
    source: string;
    date: string;
    created_at: string;
    updated_at: string;
}

export interface RecurringTransaction {
    recurring_transaction_id: number;
    user_id: number;
    amount: number;
    frequency: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

export interface Notification {
    notification_id: number;
    user_id: number;
    message: string;
    date_sent: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface Preference {
    preference_id: number;
    user_id: number;
    preference_type: string;
    preference_value: string;
    created_at: string;
    updated_at: string;
}

export interface Category {
    category_id: number;
    name: string;
    user_id?: number;
    created_at: string;
    updated_at: string;
}

export interface Subcategory {
    subcategory_id: number;
    name: string;
    category_id: number;
    user_id?: number;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    transaction_id: number;
    user_id: number;
    category_id: number;
    subcategory_id: number;
    classification_id: number;
    recurring_transaction_id?: number;
    type: "INCOME" | "EXPENSE";
    amount: number;
    date: string;
    created_at: string;
    updated_at: string;
}

export interface UserResponseDto {
    user_id: number;
    first_name: string;
    middle_name?: string;
    first_surname?: string;
    second_surname?: string;
    email: string;
    phone_number?: string;
    birthdate?: string;
    created_at?: string;
    updated_at?: string;
    userRoles?: UserRoleDto[];
    _count?: CountDto;
    addresses?: Address[];
    billingInfos?: BillingInfo[];
    bankDetails?: BankDetail[];
    budgets?: Budget[];
    goals?: Goal[];
    incomes?: Income[];
    recurringTransactions?: RecurringTransaction[];
    notifications?: Notification[];
    preferences?: Preference[];
    Category?: Category[];
    Subcategory?: Subcategory[];
    transactions?: Transaction[];
}
