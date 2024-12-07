import React from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline, IoIosArrowDown  } from "react-icons/io";

export default function Topbar() {
  return (
    <div className='bg-white w-full h-auto py-4 flex justify-between px-4 items-center'>
        <div className='w-[400px] h-12 border-[1px] rounded-lg border-gray-300 flex justify-between items-center px-4'>
        <CiSearch />
        <input type="text" placeholder='Rechercher...' className='bg-transparent outline-none w-5/6' />
        </div>
        <div className='flex justify-between items-center w-[200px]'>
        <IoIosNotificationsOutline />
        <div className='w-[30px] h-[30px] rounded-full bg-gray-300'>

        </div>
        <div className='font-Montserrat font-bold font-xl'>
            John Doe
        </div>
        <IoIosArrowDown />
        </div>
    </div>
  )
}
