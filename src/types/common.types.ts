export type BaseEntity = {
    created_at: Date;
    updated_at: Date;
};

export type BaseEntityWithUser = BaseEntity & {
    user_id: number | null;
};

export type NamedEntity = {
    name: string;
};
