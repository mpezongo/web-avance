import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LeftbarUser() {
  return (
    <div className='h-screen left-0 w-1/5 bg-blue-800 flex flex-col justify-start items-center pt-10'>
      <div className='text-4xl text-white font-Montserrat w-5/6'>
        Admin Dashboard
      </div>
      <div className='mt-20 flex flex-col w-full gap-4 justify-center items-center'>
        <NavLink to='/products' className="text-xl font-Montserrat text-white w-5/6 h-12 flex justify-start px-4 items-center hover:bg-blue-700">
          Produits
        </NavLink>
        <NavLink to='/carts' className="text-xl font-Montserrat text-white w-5/6 h-12 flex justify-start px-4 items-center hover:bg-blue-700">
          Panier
        </NavLink>
        <NavLink to='/commandes' className="text-xl font-Montserrat text-white w-5/6 h-12 flex justify-start px-4 items-center hover:bg-blue-700">
          Commandes
        </NavLink>

      </div>
    </div>
  )
}
