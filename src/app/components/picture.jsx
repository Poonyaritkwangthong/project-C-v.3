import React from 'react'

export default function Picture() {
  return (
    <div>
       <div className="h-80 bg-[url('https://www.topgear.com/sites/default/files/news-listicle/image/dsc07306.jpg')] bg-cover bg-center">
        <div className="h-full w-full flex flex-col justify-center items-center backdrop-blur-sm">
            <h3 className="text-3xl text-white font-semibold">Hello</h3>
            <h1 className="mt-5 text-center text-4xl text-white font-semibold drop-shadow-lg overline">Welcome
                <span className="text-yellow-300"> to website</span>
            </h1>
        </div>
    </div>
    </div>
  )
}
