// import axios from 'axios';
import { useState, useEffect } from 'react';
import notificationMock from './notificationsMock.json';

interface Notification {
    id: string;
    message: string;
    read: boolean;
    timestamp: string; // Cambia a `Date` si prefieres trabajar con objetos de tipo `Date`
}

const useGetUserNotifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]); // Tipamos como un array de `Notification`
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // const response = await axios.get<Notification[]>('/api/notifications'); //TODO: Descomentar esta línea para hacer la petición real
                const response = { data: notificationMock } as { data: Notification[] }; // Simulamos la respuesta de la API
                setNotifications(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return { notifications, loading, error };
};

export default useGetUserNotifications;
