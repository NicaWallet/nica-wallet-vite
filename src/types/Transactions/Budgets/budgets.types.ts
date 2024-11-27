import { BaseEntity } from "../../common.types";
import { ICategory } from "../Categories/categories.types";

export type IBudget = BaseEntity & {
    budget_id: number;
    user_id?: number;
    category_id: number;
    amount: number;
    start_date: Date;
    end_date: Date;
};

export type IBudgetById = IBudget & {
    category: ICategory;
};

