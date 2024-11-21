import { BaseEntityWithUser, NamedEntity } from "../../common.types";
import { IBudget } from "../Budgets/budgets.types";
import { ISubcategory } from "../Subcategories/subcategories.types";
import { ITransaction } from "../transactions.types";


export type ICategory = BaseEntityWithUser & NamedEntity & {
    category_id: number;
};

export type ICategoryById = ICategory & {
    Budget: IBudget[];
    subcategories: ISubcategory[];
    Transaction: ITransaction[];
};

export type ICategoryForm = {
    name: string;
};
