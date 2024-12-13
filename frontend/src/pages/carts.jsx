import React, { useState } from 'react'
import LeftbarUser from '../components/LeftbarUser'
import Topbar from '../components/Topbar'
import { NavLink } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import icons from '../constants/icons';

export default function Carts() {
    const queryClient = useQueryClient()
    const [totalPrice, setTotalPrice] = useState(0)
    const cartData = useQuery(['cartData'], async() => {
        try{
            const res = await axios.get('http://localhost:5000/cart', {
                withCredentials:true
            })
            setTotalPrice(
              res.data.reduce((total, product) => {
                return total + (product.Article.price * product.quantity)
              }, 0)
            )
            return res.data
        }catch(error){
            console.log(error)
        }
    })

    const mutationReduce = useMutation(
      async(productId) => {
        return await axios.put("http://localhost:5000/cart", {productId:productId}, {withCredentials:true})
      },
      {
        onSuccess:() => {
          queryClient.invalidateQueries(['cartData'])
        }
      }
    )

    const incrementQuantity = useMutation(
      async(productId) => {
        return await axios.post("http://localhost:5000/cart", {productId:productId}, {withCredentials:true})
      },
      {
        onSuccess:() => {
          queryClient.invalidateQueries(['cartData'])
        }
      }
    )

    const delProduct  =useMutation(
      async(productId)=> {
        return await axios.delete(`http://localhost:5000/cart/${productId}`, {withCredentials:true})
      },
      {
        onSuccess:() => {
          queryClient.invalidateQueries(['cartData'])
        }
      }
    )


    console.log(totalPrice)
return (
    <div className='w-full h-screen relative bg-blue-100 flex'>
        <LeftbarUser />
        <div className='w-4/5 relative h-auto flex flex-col justify-start items-center bg-blue-100 overflow-y-auto'>
            <Topbar />
            <div className='w-[95%] h-auto mt-10 flex flex-col gap-10'>
              <div className='w-full bg-white rounded-xl shadow-xs shadow-black'>
                <div className='flex justify-between items-center h-12 px-2 gap-4'>
                  <div className='text-gray-400 font-semibold w-[20%] text-start'>
                    
                  </div>
                  <div className='text-gray-400 font-semibold w-[20%] text-start'>
                    Nom du produit
                  </div>
                  <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%]'>
                    Quantité
                  </div>
                  <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%]'>
                    Total
                  </div>
                  <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%]'>
                    
                  </div>
                  
                </div>
                <hr className='w-full bg-gray-300'/>

                {
                  cartData.isLoading ?
                    <div className='flex justify-between items-center h-16 px-2 gap-4'>
                      Loading
                    </div>
                    :cartData.isError ?<div className='flex justify-between items-center h-16 px-2 gap-4'>
                        Error
                      </div>:
                  cartData.data.map((product, index) => 
                    <div key={index}>
                      <div className='flex justify-between items-center h-32 px-2 gap-4'>
                        <div className='text-gray-400 font-semibold w-[20%] text-start'>
                          <img src={"http://localhost:5000/static/img/"+product.Article.img} alt="" className='w-24 h-24' />
                        </div>
                        <div className='text-gray-400 font-semibold w-[20%] text-start flex gap-4'>
                          {product.Article.name}
                        </div>
                        <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%] flex items-center gap-2'>
                          <div className='w-6 h-6 rounded-full bg-red-500 flex justify-center items-center cursor-pointer' onClick={() => mutationReduce.mutate(product.Article.id)}>
                            <icons.GrFormSubtract className='font-bold text-white text-xl' />
                          </div>
                          {product.quantity}
                          <div className='w-6 h-6 rounded-full bg-green-500 flex justify-center items-center cursor-pointer' onClick={() => incrementQuantity.mutate(product.Article.id)}>
                            <icons.FiPlus className='font-bold text-white text-xl' />
                          </div>
                        </div>
                        <div className='text-gray-400 font-semibold w-[20%] text-start flex gap-4'>
                          {product.Article.price * product.quantity} $
                        </div>
                        <button onClick={() => delProduct.mutate(product.Article.id)}  className='text-red-500 font-semibold text-start font-Montserrat w-[20%]'>
                          Supprimer
                        </button>
                      </div>
                      <hr className='w-full bg-gray-300'/>
                    </div>
                  )
                }
                <div className='flex justify-between items-center h-24 px-2 gap-4 mt-10 bg-blue-800 rounded-b-lg'>
                  <div className='text-gray-400 font-bold w-[20%] text-start text-xl'>
                    Total
                  </div>
                  <div className='text-white font-bold w-[20%] text-start text-2xl'>
                    {totalPrice} $
                  </div>
                  <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%]'>
                    
                  </div>
                  <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%]'>
                    
                  </div>
                  <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%] flex justify-start items-center'>
                    <button className='text-white bg-green-500 h-10 font-semibold text-start font-Montserrat w-[200px] flex justify-center items-center rounded-lg'>
                      Commander
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
