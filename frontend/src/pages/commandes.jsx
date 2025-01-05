import React, { useState } from 'react'
import axios from 'axios'
import { MdAddCircleOutline } from "react-icons/md";
import Topbar from '../components/Topbar';
import { NavLink } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import LeftbarUser from '../components/LeftbarUser';

export default function Commandes() {

const queryClient = useQueryClient()
  const [delSuccess, setDelSuccess] = useState()

  const commandesData = useQuery(['commandesData'], async() => {
      try{
        const res = await axios.get("http://localhost:5000/commandes/", {
          withCredentials:true
        })
    
        return res.data
      }catch(error){
      }
  })

  const delMutation = useMutation(
    async(productId) => {
        const res = await axios.delete(`http://localhost:5000/commandes/${productId}`, {
            withCredentials:true
        })
        setDelSuccess(res.data.message)
    },
    {
        onSuccess:() => {
            queryClient.invalidateQueries(['commandesData'])
        }
        
    }
  )

  return (
    <div className='w-screen h-auto relative bg-blue-100 flex'>
      <LeftbarUser />
      <div className='w-5/6  relative h-screen flex flex-col justify-start items-center bg-blue-100 overflow-y-auto'>
        <Topbar />
        <div className='w-[95%] h-auto mt-10 flex flex-col gap-10'>
          <div className='w-full justify-between flex items-center h-12'>
            <span className='text-2xl font-semibold font-Montserrat'>Gestion  des produits</span>
            <NavLink to="/addProduct" className='w-[200px] h-12 bg-blue-700 hover:bg-blue-600 text-white font-Montserrat font-bold flex justify-center items-center gap-2 rounded-lg' >
              <MdAddCircleOutline className='text-2xl' />
              Ajouter un produit
            </NavLink>
          </div>
          {
            delSuccess &&
            <div className='w-full text-green-500'>
                {delSuccess}
            </div>
          }
          <div className='w-full bg-white rounded-xl shadow-xs shadow-black overflow-y-auto mb-10'>
            <div className='flex justify-between items-center h-12 px-2 gap-4'>
              <div className='text-gray-400 font-semibold text-start font-Montserrat w-[40%]'>
                Produits
              </div>
              <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%]'>
                Quantity
              </div>
              <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%]'>
                Etat
              </div>
              <div className='text-gray-400 font-semibold text-start font-Montserrat w-[20%]'>
                Actions
              </div>
            </div>
            <hr className='w-full bg-gray-300'/>

            {
              commandesData.isLoading 
              ? <div>Loading</div>
              :commandesData.isError 
              ? <div>Error</div>:
              commandesData.data && commandesData.data.map((commande, index) => 
                <div key={index}>
                  <div className='flex justify-between items-center h-16 px-2 gap-4'>
                    {/* <div className='font-bold w-[25%] text-start'>
                      {commande.User.username}
                    </div> */}
                    <div className='text-start font-Montserrat w-[40%]'>
                      {commande.Article.name}
                    </div>
                    <div className='text-start font-Montserrat w-[20%]'>
                      {commande.quantity} 
                    </div>
                    <div className='text-start font-Montserrat w-[20%]'>
                      {commande.status}
                    </div>
                    {
                        commande.status === 'processing' ?
                        <button onClick={() => delMutation.mutate(commande.Article.id)}  className='text-red-500 font-semibold text-start font-Montserrat w-[20%]'>
                        Supprimer
                        </button>
                        :
                        <button disabled className='text-red-500 font-semibold text-start font-Montserrat w-[20%]'>
                        
                        </button>
                    }
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
