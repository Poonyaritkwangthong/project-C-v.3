
import React from 'react'

export default function Aboutcontent2() {
  return (
    <div>
        <div className='p-10'>
        <iframe className='w-[70rem] h-[40rem] mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300' src="https://www.youtube.com/embed/xZjYw6XhwVY?si=_8QD4HkW7M-vuzIG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div className=''>
            <h1 className='text-center text-white text-6xl font-extrabold underline-offset-8 underline'>ABOUT</h1>
        </div>
        <div className='mt-8 p-6 flex justify-between border-b transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-orange-500'>
            <div className='flex justify-center gap-6 mx-auto'>
                <div className=''>
                    <img className='w-[30rem] h-[20rem] rounded-xl' src="https://shop8039.sfstatic.io/upload_dir/shop/_thumbs/rocket_bunny_logo_r195.w1200.jpg" alt="" />
                </div>
                <div className='w-[30rem]'>
                    <h1 className='text-white text-xl'>about</h1>
                    <h1 className='font-bold text-5xl'>Rocket Bunny</h1>
                    <h className='text-justify'>Kei Miura’s design has gained global acclaim for the trend-setting style that drives automotive enthusiast, to demand authentic Rocket Bunny / Pandem aero kits. However, it's the top quality Japanese-made versions, which GReddy exclusively imports, which has gained the devotion and admiration of racers, car show winners and their installers. The main reason is, the top quality construction and fitment that only precision manufacturing can provide. Japanese-made Rocket Bunny / Pandem kits only use the highest quality FRP materials and proper curing times to prevent distortion.</h>
                </div>
                <div className='mt-[17rem]'>
                    <a href="/rocketbunny"><button className='bg-white text-black text-xl p-2 flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>View<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000000"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg></button></a>
                </div>
            </div>      
        </div>
        <div className='p-6 flex justify-between border-b transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-red-500'>
            <div className='flex justify-center gap-6 mx-auto'>
                <div className='mt-[17rem]'>
                    <a href="/libertywalk"><button className='bg-white text-black text-xl p-2 flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'><svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>View</button></a>
                </div>
                <div className='w-[30rem]'>
                    <h1 className='text-white text-xl text-end'>about</h1>
                    <h1 className='font-bold text-5xl text-end'>Liberty Walk</h1>
                    <h className='text-justify'>While keeping with the proud tradition of Japan Grand Champion Series Silhouette Cars, Liberty Walk have revolutionised the way LB-Works cars are built! With the LB Silhouette Works GT range every panel on the car, with the exception of the roof and doors, will now be available with the new innovative wide-body full panel replacements. It is Liberty Walk’s unique Japanese background and years of custom car building that has brought Liberty Walk to the point it is at today. As a new part of the LB-Works line-up, LB Silhouette Works GT will continue to define Liberty Walk for years to come.</h>
                </div> 
                <div className=''>
                    <img className='w-[25rem] h-[20rem] rounded-xl' src="https://i.ebayimg.com/images/g/NhoAAOSwt31lxYPL/s-l1200.jpg" alt="" />
                </div>   
            </div>
        </div>
        <div className='p-6 flex justify-between border-b transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-green-500'>
            <div className='flex justify-center gap-6 mx-auto'>
                <div className=''>
                    <img className='w-[30rem] h-[20rem] rounded-xl' src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/rwb-rauh-welt-begriff-logo-sascha-britz.jpg" alt="" />
                </div>
                <div className='w-[30rem]'>
                    <h1 className='text-white text-xl'>about</h1>
                    <h1 className='font-bold text-5xl'>RAUH-Welt BEGRIFF (rwb)</h1>
                    <h className='text-justify'>RWB/RAUH-Welt BEGRIFF is a Porsche tuner located in Japan.
                                    RWB has combined Japanese and Euro tuning elements,
                                    creating the distinct RWB style for Porsche chassis.
                                    Starting off as a small countryside body-shop in Chiba-Ken,
                                    RAUH-Welt 911’s are now a common sight on both the streets and racing circuits of Japan.
                                    We create only one RWB Porsche for each customer.
                    </h>
                </div>
                <div className='mt-[17rem]'>
                    <a href="/rwb"><button className='bg-white text-black text-xl p-2 flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'>View<svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#000000"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg></button></a>
                </div>
            </div>      
        </div>
    </div>
  )
}
