import React from 'react'
import Letfbar from '../components/Letfbar'
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline, IoIosArrowDown  } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";

const products = [
  {
    name:'Laptop Pro	',
    category:'Électronique',
    price:'1299.99 ',
    stock:'50'
  },
  {
    name:'Smartphone X	',
    category:'Électronique',
    price:'799.99 ',
    stock:'250'
  },
  {
    name:'Tablette Air',
    category:'Électronique',
    price:'199.99 ',
    stock:'145'
  },
  {
    name:'Casque sans fil	',
    category:'Accessoires',
    price:'249.99 ',
    stock:'142'
  },
  {
    name:'Montre connectée	',
    category:'Accessoires',
    price:'499.99 ',
    stock:'258'
  },
]

export default function AdminDashboard() {
  return (
    <div className='w-screen h-auto relative bg-blue-100 flex'>
      <Letfbar />
      <div className='w-5/6  relative h-screen flex flex-col justify-start items-center bg-blue-100'>
        <div className='bg-white w-full h-16 flex justify-between px-4 items-center'>
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
        <div className='w-[95%] h-auto mt-10 flex flex-col gap-10'>
          <div className='w-full justify-between flex items-center h-12'>
            <span className='text-2xl font-semibold font-Montserrat'>Gestion  des produits</span>
            <button className='w-[200px] h-12 bg-blue-700 hover:bg-blue-600 text-white font-Montserrat font-bold flex justify-center items-center gap-2 rounded-lg' >
              <MdAddCircleOutline className='text-2xl' />
              Ajouter un produit
            </button>
          </div>
          <div className='w-full bg-white rounded-xl shadow-xs shadow-black'>
            <div className='flex justify-between items-center h-12 px-2 gap-4'>
              <div className='text-gray-400 font-semibold w-[25%] text-start'>
                Nom du produit
              </div>
              <div className='text-gray-400 font-semibold text-start font-Montserrat w-[15%]'>
              Catégorie
              </div>
              <div className='text-gray-400 font-semibold text-start font-Montserrat w-[15%]'>
              Prix
              </div>
              <div className='text-gray-400 font-semibold text-start font-Montserrat w-[15%]'>
                Stock
              </div>
              <div className='text-gray-400 font-semibold text-start font-Montserrat w-[15%]'>
                Actions
              </div>
              <div className='text-gray-400 font-semibold text-start font-Montserrat w-[15%]'>
              </div>
            </div>
            <hr className='w-full bg-gray-300'/>

            {
              products &&
              products.map((product, index) => 
                <div key={index}>
                  <div className='flex justify-between items-center h-16 px-2 gap-4'>
                    <div className='font-bold w-[25%] text-start'>
                      {product.name}
                    </div>
                    <div className='text-start font-Montserrat w-[15%]'>
                      {product.category}
                    </div>
                    <div className='text-start font-Montserrat w-[15%]'>
                      {product.price} $
                    </div>
                    <div className='text-start font-Montserrat w-[15%]'>
                      {product.stock}
                    </div>
                    <div className='text-blue-600 font-semibold text-start font-Montserrat w-[15%]'>
                      Editer
                    </div>
                    <div className='text-red-500 font-semibold text-start font-Montserrat w-[15%]'>
                      Supprimer
                    </div>
                  </div>
                  <hr className='w-full bg-gray-300'/>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
