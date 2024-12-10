import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'

import Leftbar from '../components/Leftbar'
import Topbar from '../components/Topbar'
import icons from '../constants/icons'

export default function ModifyCommande() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const commandeId = params.get("commandeId")

    const [commandeData, setCommandeData] = useState({
        quantity:"",
        status:""
    })
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    useState(() => {
        const fnc = async() => {
            try{
                const res = await axios.get(`http://localhost:5000/commandes/${commandeId}`, {
                    withCredentials:true
                })

                setCommandeData(res.data)
            }catch(error){
                console.log(error)
            }
        }
        fnc()
    }, [commandeId])

    const handleChangeCommandeData = (event) => {
        event.preventDefault()
        setCommandeData({...commandeData, [event.target.name]:event.target.value})
    }

    const handleModifyCommande = async(event) => {
        event.preventDefault()
        const newErrors = {}
        const {quantity, status} = commandeData
        if (!quantity) newErrors.name = "Veuillez entrer la quantité"
        if (!status) newErrors.price = "Veuillez selectionner un status"
        if (Object.keys(newErrors).length > 0) return setError(newErrors)
        try{
            const res = await axios.put(`http://localhost:5000/commandes/${commandeId}`, {
                quantity:commandeData.quantity,
                status:commandeData.status
            }, {withCredentials:true})
            setSuccess(res.data.message)
        }catch(error){
            setError({...error, serveur:error.response.data.message})
        }
    }

    console.log(commandeData)
  return (
    <div className='w-full h-screen relative bg-blue-100 flex'>
        <Leftbar />
        <div className='w-4/5 relative h-auto flex flex-col justify-start items-center bg-blue-100 overflow-y-auto'>
            <Topbar />
            <div className='w-[700px] bg-white h-auto mt-10 rounded-xl p-12 mb-10'>
                <div className='flex justify-between items-center h-24 '>
                    <span className='font-bold text-xl font-Montserrat'>Modification de la commande N°{commandeId}</span>
                    <NavLink to="/adminCommandes" className="flex gap-2 justify-center items-center text-blue-600 rounded-lg h-12 px-2 duration-150 hover:bg-gray-100">
                        <icons.IoIosArrowRoundBack />
                        Retour à la liste
                    </NavLink>
                </div>
                <form className='flex flex-col gap-2 w-full'>
                    <label htmlFor="status" className='flex flex-col justify-center items-start gap-1 font-semibold'>
                        Status
                        <select value={commandeData.status || ""} name="status" id="status" className='font-light border-[1px]  border-gray-300 h-10 w-full px-2 rounded-lg outline-none' onChange={handleChangeCommandeData}>
                            <option value="">Selectionner un status</option>
                            <option value="processing">Processing</option>
                            <option value="delivering">Delivering</option>
                            <option value="completed">Completed</option>
                        </select>
                    </label>
                    <label htmlFor="quantity" className='flex flex-col justify-center items-start gap-1 font-semibold'>
                        Quantité
                        <input type="number" id='quantity' name='quantity' placeholder='0' step='1' min='0' onChange={handleChangeCommandeData} value={commandeData.quantity}
                            className='border-[1px]  border-gray-300 h-10 w-full px-2 rounded-lg outline-none font-light'
                        />
                    </label>
                    <div className='w-full justify-end flex mt-5'>
                        <button onClick={handleModifyCommande} className='w-[200px] bg-blue-700 h-12 text-white font-bold rounded-lg'>
                            Modifier la commande
                        </button>
                    </div>
                    {
                        success && <span className='text-green-500 w-full text-center'>{success}</span>
                    }
                    {
                        error && error.serveur && <span className='text-red-500 w-full text-center'>{error.serveur}</span>
                    }
                </form>
            </div>
        </div>
    </div>
  )
}
