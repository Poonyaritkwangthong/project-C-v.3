"use client";
import { createContext, useEffect, useState } from "react"
import Swal from "sweetalert2";
const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if(typeof window!=='undefined'){
            setToken(sessionStorage.getItem('token')||'');
        }
        if (token) {
            fetchUser();
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            await fetch(`http://localhost:8000/sanctum/csrf-cookie`);
            const response = await fetch(`http://localhost:8000/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                console.log(data.user)
            } else if (response.status === 401) {
                Swal.fire({
                    icon: 'warning',
                    text: data.message,
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error
            });
        }
    }
    console.log(user);
    console.log(token);

return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
    {children}
    </UserContext.Provider >
  );
};

export { UserContext };
