'use client';
import React, { useContext } from 'react'
import Link from "next/link";
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';




export default function Appbar() {
    const { user, setUser, token, setToken } = useContext(UserContext);
    const router = useRouter();
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8000/sanctum/csrf-cookie`);
            const response = await fetch(`http://localhost:8000/api/logout`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    text: data.message,
                });
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user_name');
                setUser(null);
                setToken(null);
                router.push('/');
            } else if (response.status === 422) {
                setError(data.errors);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error
            });
        }
    }
    return (
        <div>
            <div className="flex justify-between p-2">
                <div className='text-3xl'>
                    <ul className='flex gap-4 ml-2 mt-1'>
                        <Link className='shadow-lg hover:shadow-indigo-500/40 font-semibold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' href="/">HOME</Link>
                        <Link className='shadow-lg hover:shadow-indigo-500/40 font-semibold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' href="/about">ABOUT</Link>
                        {token ? (
                            <Link className='shadow-lg hover:shadow-indigo-500/40 font-semibold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' href="/car">CAR</Link>
                        ) : (
                            <span></span>
                        )}

                        {user?.user_type === 'admin' ? (
                            <Link className='shadow-lg hover:shadow-indigo-500/40 font-semibold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' href="/admin">ADMIN</Link>
                        ) : (
                            <span></span> // หรือให้แสดงอะไรที่คุณต้องการ
                        )}
                    </ul>
                </div>
                <div className='text-xl my-auto'>
                    <ul className="flex justify-screen gap-6 mr-2">
                        {token ? (
                            <div className='flex items-center gap-4'>
                                <h1 className=''>{user?.name}</h1>
                                <button className='shadow-lg hover:shadow-indigo-500/40 bg-white text-black p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' onClick={e => onSubmitChange(e)}>LOGOUT</button>
                            </div>
                        ) : (
                            <div>
                                <Link className='shadow-lg hover:shadow-indigo-500/40 bg-white text-black p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' href="/login">LOGIN</Link>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
