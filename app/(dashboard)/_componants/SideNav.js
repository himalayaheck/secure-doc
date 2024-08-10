"use client"
import { File, Shield, Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'


function SideNav() {
    const menuList = [
        {
            id: 1,
            name: "Upload",
            icon: Upload,
            path: '/upload'
        },
        {
            id: 2,
            name: "Files",
            icon: File,
            path: '/files'
        },
        {
            id: 3,
            name: "Upgrade",
            icon: Shield,
            path: '/upgrade'
        },
    ]
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className='shadow-sm border-r h-full '>
            <div className='p-4 border-b'>
                <Image src='/logo.svg' width={50} height={40} alt='app icon' />
            </div>
            <div className='flex flex-col float-left'>
                {menuList.map((item, index) =>
                    <button
                    key={item.id}
                     className={`flex gap-2 p-4 px-6 hover:bg-blue-200 w-full text-gray-500 ${activeIndex == index ?'bg-blue-50 text-blue-400' : null}`}
                        onClick={() => setActiveIndex(index)}>
                        <item.icon />
                        <h2>{item.name}</h2>
                    </button>
                )}
            </div>

        </div>
    )
}

export default SideNav
