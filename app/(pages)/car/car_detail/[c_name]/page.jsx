"use client";
import { UserContext } from '@/app/context/UserContext';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import Link from 'next/link';

export default function ViewCarPage() {
  const { user, setUser, token, setToken } = useContext(UserContext);
  const { c_name } = useParams();


  const [car, setCar,] = useState({}); // เปลี่ยนจาก [] เป็น {}

  useEffect(() => {
    fetchCar();
    if (token) {
      fetchLiked();
    }
  }, [c_name, token]);

  const fetchCar = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cardetail/${c_name}`);
      const data = await response.json();
      if (response.ok) {
        console.log(data.cars);
        setCar(data.cars);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something Wrong!"
      });
    }
  }

  const [liked, setLiked] = useState([]);
  const isLiked = liked.some(like => like.user_id === user?.id && like.car_id === car?.id);
  console.log(liked);
  const fetchLiked = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/liked`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLiked(data.liked);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something Wrong!"
      });
    }
  }



  const Like = async (e, car_id) => {
    e.preventDefault();
    console.log('car_id', car_id);

    try {
      const response = await fetch(`http://localhost:8000/api/likes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ car_id })
      });
      const data = await response.json();
      console.log(user);
      console.log(response);
      console.log(token);
      console.log(data);
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          text: data.message,
        })
        fetchLiked();
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'warning',
          text: data.message,
        })
      } else if (response.status === 500) {
        Swal.fire({
          icon: 'error',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error,
      })
    }
  }

  const unlike = liked.find(like => like.user_id === user?.id && like.car_id === car?.id);
  const deleteLike = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/unlike/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          text: data.message,
        })
        fetchLiked();
      } else if (response.status === 400) {
        Swal.fire({
          icon: 'warning',
          text: data.message,
        })
      } else if (response.status === 500) {
        Swal.fire({
          icon: 'error',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error,
      })
    }
  }

  return (
    <div className='p-[4rem]'>
      <div>
        <h1 className='text-center text-5xl'>Car Detail</h1>
      </div>
      <div className='mt-4'>
        <Link className='flex items-center text-2xl' href="/car"><IoMdArrowBack />back</Link>
      </div>

      <div className='flex justify-center gap-[5rem] p-8 mt-4'>
        <div className='w-[35rem] overflow-hidden p-5'>
          <h1 className='flex gap-2 items-center text-2xl'><p className=' font-bold'>Car ID :</p> {car?.id}</h1>

          <h1 className='mt-2 text-4xl'>{car?.c_name}</h1>

          <div className='mt-4 '>
            <h1 className='text-3xl font-bold'>Car Detail </h1>
            <p className="mt-2 text-xl">{car?.c_detail}</p>
          </div>
          {isLiked ? (
            <button onClick={(e) => deleteLike(e, unlike?.id)}><IoMdHeart className='text-red-500 text-4xl mt-2' /></button>
          ) : (
            <button onClick={(e) => Like(e, car?.id)}><CiHeart className='text-red-500 text-4xl mt-2' /></button>
          )}
        </div>

        <div className='w-1/2'>
          <img className="w-full " src={`http://localhost:8000/images/car/${car.c_img}`} alt="" />
        </div>
      </div>

      <div className='flex p-4 justify-center gap-[20rem] items-center'>
        <div className='w-[20rem]'>
          <img className="w-full " src={`http://localhost:8000/images/brand/${car.brand?.b_img}`} alt="" />
        </div>
        <div className='w-[30rem]'>
          <h1 className='text-4xl'>Brand name : {car?.brand?.b_name}</h1>
          <h1 className='text-3xl'>Brand location : {car?.brand?.b_location}</h1>
          <h1 className='text-2xl'>Founded year : {car?.brand?.founded_year}</h1>
        </div>
      </div>

      <div className='flex justify-center items-center gap-[20rem] p-4'>
        <div className='w-[30rem]'>
          <h1 className='text-4xl'>Engine type :{car?.engine?.e_type}</h1>
          <h1 className='text-3xl'>Engine detail</h1>
          <p className='text-2xl'>{car?.engine?.e_detail}</p>
          <h1 className='text-3xl'>Engine HP : {car?.engine?.e_hp}</h1>
        </div>
        <div className='w-[25rem]'>
          <img className="w-full " src={`http://localhost:8000/images/engine/${car.engine?.e_img}`} alt="" />
        </div>
      </div>
    </div>
  );
}
