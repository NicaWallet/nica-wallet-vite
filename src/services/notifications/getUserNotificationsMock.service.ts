import axios from 'axios';
import { useState, useEffect } from 'react';

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
                const response = await axios.get<Notification[]>('https://672aff7c976a834dd02529ee.mockapi.io/Notifications'); // Especificamos el tipo de los datos esperados en la respuesta
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
