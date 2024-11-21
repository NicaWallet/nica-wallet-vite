import { BaseEntity } from "../../common.types";
import { ITransaction } from "../transactions.types";


export type IHistory = BaseEntity & {
    history_id: number;
    transaction_id: number;
    change_date: Date;
    old_value: string;
    new_value: string;
    transaction: ITransaction;
};
