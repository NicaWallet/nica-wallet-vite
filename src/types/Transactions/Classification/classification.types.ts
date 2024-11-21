import { BaseEntity, NamedEntity } from "../../common.types";
import { ITransaction } from "../transactions.types";


export type IClassification = BaseEntity & NamedEntity & {
    classification_id: number;
    Transaction: ITransaction[];
    _count: {
        Transaction: number;
    };
};
