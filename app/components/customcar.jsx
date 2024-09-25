import React from 'react'

export default function Customcar( { brandname, brandimg, brand_datail, owner, ownerimg, ownerdetail1, ownerdetail2 } ) {
  return (
    <div>
        <div className='bg-black p-5 border-white border-b font-bold'>
            <h1 className='text-center text-white text-3xl'>{brandname}</h1>
        </div>
        <div className=''>
        <a className='text-3xl flex items-center bg-white text-black w-[7rem] p-2 mt-[3rem] mx-8 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' href="/about"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>back</a>
        </div>
        <div className='p-[5rem]'>
            <div className='flex justify-center gap-[5rem]'>
                <div>
                    <img className='w-[40rem] h-[45rem]' src={ownerimg} alt="" />
                </div>
                <div className='bg-white w-[35rem] h-[40rem] text-black p-6'>
                    <h1 className='text-4xl font-bold mt-2'>{owner}</h1>
                    <p className='text-slate-600 mt-4'>{ownerdetail1}</p>
                    <p className='text-slate-600 mt-4'>{ownerdetail2}</p>
                </div>
            </div>
        </div>
        <div>
            <div className='flex justify-center gap-8 items-center'>
                <div className='w-[40rem] h-[45rem] bg-white p-6'>
                    <h1 className='text-black font-bold mt-4 text-4xl '>{brandname}</h1>
                    <p className='text-slate-600 mt-4'>{brand_datail}</p>
                </div>
                <div>
                    <img className='w-[35rem] h-[20rem] ' src={brandimg} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
