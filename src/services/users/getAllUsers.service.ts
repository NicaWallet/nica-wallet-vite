import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '../api';
import { useTranslation } from 'react-i18next';
import { create } from 'zustand';

// Definición de los tipos de datos, incluidos roles y usuarios
export interface UserRole {
    role: {
        role_name: string;
    };
}

export interface GetAllUser {
    user_id: number;
    first_name: string;
    middle_name: string | null;
    first_surname: string;
    second_surname: string | null;
    email: string;
    phone_number: string | null;
    birthdate: string;
    created_at: string;
    updated_at: string;
    userRoles: UserRole[];
    [key: string]: unknown;  // Firma de índice añadida
}


interface UseGetAllUsersStore {
    users: GetAllUser[];
    setUsers: (users: GetAllUser[]) => void;
}

// Zustand store para manejar los usuarios globalmente
const useUserStore = create<UseGetAllUsersStore>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
}));

/**
 * Custom hook para obtener todos los usuarios.
 * @returns Un objeto con los datos de los usuarios, el estado de carga, el estado de error y la función fetchUsers.
 */
export const useGetAllUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { t } = useTranslation();
    const { users, setUsers } = useUserStore();

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(undefined);

        try {
            const response = await api.get('/users', { responseType: 'json' });
            console.log("get all users response", response.data);
            setUsers(response.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(t('USERS_FETCH_FAILED'));
            } else {
                setError(t('USERS_ERROR'));
            }
        } finally {
            setLoading(false);
        }
    }, [setUsers, t]);

    useEffect(() => {
        if (users.length === 0) fetchUsers();
    }, [fetchUsers, users.length]);

    return { users, fetchUsers, loading, error };
};
