'use client';
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/context/UserContext';

export default function Register() {
    const { setUser, setToken } = useContext(UserContext);
    const router = useRouter();
    const [field, setField] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const changeFieldHandler = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value
        });
    }
    console.log(field);

    const [error, setError] = useState([]);
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8000/sanctum/csrf-cookie`);
            const response = await fetch(`http://localhost:8000/api/register`, {
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
console.log(error);

    return (
        <div>
            <form action="">
        <div className='w-[20rem] border-2 border-white p-4 mx-auto mt-[15rem]'>
            <h1 className="text-center text-2xl mt-4">
                Register
            </h1>
        <div>
        <label htmlFor="name" className="mt-4 block text-sm font-medium leading-6 text-white ">name</label>
        <input className='text-black block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-control' type="text" name="name" id="" required="required" title=""
          onChange={e => changeFieldHandler(e)}
          />
          {error && error.name && (
              <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#d70000] outline outline-offset-2 outline-1 outline-[#d70000] px-2 text-sm`}>
                {error.name}
              </div>
            )}
        </div>

        <div>
        <label htmlFor="email" className="mt-2 block text-sm font-medium leading-6 text-white ">email</label>
        <input className='text-black block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-control' type="text" name="email" id="" required="required" title=""
          onChange={e => changeFieldHandler(e)}
          />
          {error && error.email && (
              <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#d70000] outline outline-offset-2 outline-1 outline-[#d70000] px-2 text-sm`}>
                {error.email}
              </div>
            )}
        </div>

        <div>
        <label htmlFor="password" className="mt-2 block text-sm font-medium leading-6 text-white ">password</label>
        <input className='text-black block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-control' type="password" name="password" id="" required="required" title=""
         onChange={e => changeFieldHandler(e)}/>
         {error && error.password && (
              <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#d70000] outline outline-offset-2 outline-1 outline-[#d70000] px-2 text-sm`}>
                {error.password}
              </div>
            )}
        </div>

        <div>
        <label htmlFor="password_confirmation" className="mt-2 block text-sm font-medium leading-6 text-white ">confirm password</label>
        <input className='text-black block w-full rounded-md border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 form-control' type="password" name="password_confirmation" id="" required="required" title=""
         onChange={e => changeFieldHandler(e)}/>
         {error && error.password_confirmation && (
              <div className={`mt-2 bg-gradient-to-t from-[#5e0a0a] to-[#d70000] outline outline-offset-2 outline-1 outline-[#d70000] px-2 text-sm`}>
                {error.password_confirmation}
              </div>
            )}
        </div>

        <div className='mt-2'>
        <button type='submit' onClick={e => onSubmitChange(e)}>register</button> 
        </div>
        </div>
        
      </form>
        </div>
    )
}
