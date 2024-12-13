import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Leftbar from '../components/Leftbar'
import { MdAddCircleOutline } from "react-icons/md";
import Topbar from '../components/Topbar';
import { NavLink } from 'react-router-dom';

export default function AdminProduct() {


  const [products, setProducts ] = useState()

  useEffect(() => {
    const fnc = async() => {
      try{
        const res = await axios.get("http://localhost:5000/products", {
          withCredentials:true
        })

        setProducts(res.data)
      }catch(error){
        console.log(error)
      }
    }

    fnc()
  }, [])

  const delProduct = async(productId) => {
    try{
      const res = await axios.delete(`http://localhost:5000/products/${productId}`, {
        withCredentials:true
      })

      console.log(res)
    }catch(error) {
      console.log(error)
    }
  }

  console.log(products)


  return (
    <div className='w-screen h-auto relative bg-blue-100 flex'>
      <Leftbar />
      <div className='w-5/6  relative h-screen flex flex-col justify-start items-center bg-blue-100'>
        <Topbar />
        <div className='w-[95%] h-auto mt-10 flex flex-col gap-10'>
          <div className='w-full justify-between flex items-center h-12'>
            <span className='text-2xl font-semibold font-Montserrat'>Gestion  des produits</span>
            <NavLink to="/addProduct" className='w-[200px] h-12 bg-blue-700 hover:bg-blue-600 text-white font-Montserrat font-bold flex justify-center items-center gap-2 rounded-lg' >
              <MdAddCircleOutline className='text-2xl' />
                Ajouter un produit
            </NavLink>
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
                      {product.categorie}
                    </div>
                    <div className='text-start font-Montserrat w-[15%]'>
                      {product.price} $
                    </div>
                    <div className='text-start font-Montserrat w-[15%]'>
                      {product.stock}
                    </div>
                    <NavLink to={"/modifyProduct?productId=" + product.id} className='text-blue-600 font-semibold text-start font-Montserrat w-[15%]'>
                      Editer
                    </NavLink>
                    <button onClick={() => delProduct(product.id)}  className='text-red-500 font-semibold text-start font-Montserrat w-[15%]'>
                      Supprimer
                    </button>
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
