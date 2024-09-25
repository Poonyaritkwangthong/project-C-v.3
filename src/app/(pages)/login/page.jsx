'use client';
import React, { useState, useContext } from 'react'
import Link from "next/link";
import Swal from 'sweetalert2';
import { IconBase } from 'react-icons';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/context/UserContext';

export default function Login() {
    const { setUser, setToken } = useContext(UserContext);
    const router = useRouter();
    const [error, setError] = useState([]);
    const [field, setField] = useState({
        email: "",
        password: "",
    });

    const changeFieldHandler = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value
        });
    }
    console.log(field);
    const onSubmitChange = async(e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8000/sanctum/csrf-cookie`);
            const response = await fetch(`http://localhost:8000/api/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(field),
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    text: data.message,
                });
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('user_name', data.user.name);
                setUser(data.user);
                setToken(data.token);
                router.push('/');
            }else if (response.status === 422) {
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
      <form action="">
        <div className="mt-[20rem]">
          <div className='w-[20rem] p-4 border-2 border-white mx-auto '>
            <h1 className='text-center text-3xl'>Login</h1>
              <div>
                <label htmlFor="email" className="mt-2 block text-sm font-medium leading-6 text-white ">email</label>
                <input className='text-black block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-control' type="text" name="email" id=""  required="required" title=""
                onChange={e => changeFieldHandler(e)}
                />
                {error && error.email && (
                <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#d70000] outline outline-offset-2 outline-1 outline-[#d70000] px-2 text-sm`}>
                  {error.email}
                </div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white ">password</label>
                <input className='text-black block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-control' type="password" name="password" id=""  required="required" title=""
                onChange={e => changeFieldHandler(e)}
                />
                {error && error.password && (
                <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#d70000] outline outline-offset-2 outline-1 outline-[#d70000] px-2 text-sm`}>
                {error.password}
                </div>
                )}
              </div>
              <div className='flex justify-between mt-2'>
                <Link href="/register">register</Link>
                <button type='submit' onClick={e => onSubmitChange(e)}>login</button> 
              </div>
          </div>
        </div>
      </form>
    </div>
  )
}
