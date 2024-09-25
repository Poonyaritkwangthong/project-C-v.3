'use client';
import Link from 'next/link';
import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { MdCarCrash, MdBrightness7, MdOutlineAssignment, MdOutlineArrowForwardIos } from "react-icons/md";
import { LikeChart } from '../components/likeChart';

export default function Admin() {
  return (
    <div>
      <div className='flex gap-[5rem]'>
        <div className='border-white border-2 w-[15rem] h-[25rem]'>
          <h1 className='mt-6 ml-2 font-bold text-2xl'>Admin Menu</h1>
          <div className='mt-[1rem] border-2 border-white p-2 hover:text transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-violet-500'>
            <Link className='text-center flex items-center gap-2' href="/admin/car_table/index">
              <MdCarCrash className='text-xl' />
              car table
              <MdOutlineArrowForwardIos className='text-right' />
            </Link>
          </div>
          <div className='border-2 border-white p-2 hover:text transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-violet-600'>
            <Link className='text-center flex items-center gap-2' href="/admin/brand_table/index">
              <MdOutlineAssignment className='text-xl' />
              brand table
              <MdOutlineArrowForwardIos className='text-right' />
            </Link>
          </div>
          <div className=' border-2 border-white p-2 hover:text transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-purple-700'>
            <Link className='text-center flex items-center gap-2' href="/admin/engine_table/index">
              <MdBrightness7 className='text-xl' />
              engine table
              <MdOutlineArrowForwardIos className='text-right' />
            </Link>
          </div>

          <div className='ml-4 border-2 border-white  w-[5rem] mt-[2rem] hover:text transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-yellow-500'>
            <Link className='flex items-center' href="/"><GoArrowLeft />home</Link>
          </div>
        </div>
        <div className='w-[80rem] mx-auto mt-6'>
        <LikeChart/>
        </div>
      </div>
    </div>
  )
}
