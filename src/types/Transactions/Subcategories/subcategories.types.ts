import { BaseEntityWithUser, NamedEntity } from "../../common.types";

export type ISubcategory = BaseEntityWithUser & NamedEntity & {
    subcategory_id: number;
    category_id: number;
};
