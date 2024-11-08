import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '../api';
import { useTranslation } from 'react-i18next';
import { create } from 'zustand';

export interface IUserRoleResponse {
    user: IUser;
    role: IRole;
    [key: string]: unknown;
}

export interface IRole {
    role_id: number;
    role_name: string;
}

export interface IUser {
    user_id: number;
    first_name: string;
    middle_name: string;
    first_surname: string;
    second_surname: null;
    email: string;
    phone_number: string;
    birthdate: Date;
    created_at: Date;
    userConnectionLogs: IUserConnectionLog[];
}

export interface IUserConnectionLog {
    connection_id: number;
    login_time: Date;
    logout_time: null;
    user_id: number;
}

interface IUseUserRolesStore {
    userRoles: IUserRoleResponse[];
    setUserRoles: (userRoles: IUserRoleResponse[]) => void;
}

const useUserRolesStore = create<IUseUserRolesStore>((set) => ({
    userRoles: [],
    setUserRoles: (userRoles) => set({ userRoles }),
}));

export const useGetAllUsersRoles = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { t } = useTranslation();
    const { userRoles, setUserRoles } = useUserRolesStore();

    const fetchUsersRoles = useCallback(async () => {
        setLoading(true);
        setError(undefined);

        try {
            const response = await api.get('/user-role', { responseType: 'json' });
            console.log("get all user roles response", response.data);
            setUserRoles(response.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(t('USERS_ROLES_FETCH_FAILED'));
            } else {
                setError(t('USERS_ROLES_ERROR'));
            }
        } finally {
            setLoading(false);
        }
    }, [t, setUserRoles]);

    useEffect(() => {
        fetchUsersRoles();
    }, [fetchUsersRoles]);

    return { userRoles, loading, error, fetchUsersRoles };
}