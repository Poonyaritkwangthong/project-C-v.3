'use client';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Appbar from '../../components/appbar';
import Link from "next/link";

export default function page() {

    const [carData, setCarData] = useState([]);
    console.log(carData)
    useEffect(() => {
        fetchCar();
    }, []);

    const fetchCar = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/carall`);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setCarData(data.cars);
                console.log(data.cars);
            }
            console.log(response.cars);
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error,
            }, 500);
        }
    }

    return (
        <div>
            <Appbar />
            <div>
                <h1 className='mt-4 text-6xl text-center font-semibold '>Car</h1>
            </div>
            <div className='grid grid-cols-4 gap-6 p-4'>
                {carData.map((car, index) => (
                    <div key={car.id} className='bg-white  p-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mt-6 overflow-hidden '>
                        <div className='h-[15rem]'>
                            <img className='w-full border-2 border-black object-cover h-full' src={`http://localhost:8000/images/car/${car.c_img}`} alt="" />
                        </div>
                        <div className='mt-2 text-black overflow-hidden'>
                            <p className=' font-bold'>{car.c_name}</p>
                            <p className=' text-wrap'>{car.brand.b_name}</p>
                            <p className=''>{car.engine.e_hp}</p>
                            <div className=' text-white  flex justify-end mt-2'>
                                <Link className='font-bold  bg-black flex p-2 hover:bg-orange-400 transition delay-150 ease-in-outhover:-translate-y-1 hover:scale-110 duration-300 border border-black' href={`/car/car_detail/${car.c_name}`}>read more<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" /></svg></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
