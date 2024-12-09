import React from 'react'
import Topbar from '../components/Topbar';
import Leftbar from '../components/Leftbar'
import icons from '../constants/icons';
import img from '../constants/images'

export default function AdminDashboard() {
  return (
    <div className='w-full h-screen relative bg-blue-100 flex'>
        <Leftbar />
        <div className='w-4/5 relative h-auto flex flex-col justify-start items-center bg-blue-100 overflow-y-auto'>
            <Topbar />
            <div className='w-[95%] mt-10 flex flex-col justify-start items-center gap-5'>
                <div className='w-full justify-between items-center flex'>
                    <div className='w-1/5 h-24 bg-white rounded-lg flex justify-center items-center gap-5'>
                        <div className='w-[60px] h-[60px] bg-blue-500 rounded-full flex justify-center items-center'>
                            <icons.FcSalesPerformance className='text-3xl'/>
                        </div>
                        <div className=' flex flex-col justify-center items-center '>
                            <div className='text-2xl text-blue-500 font-bold font-Montserrat'>
                                250k
                            </div>
                            <div className='font-light text-black text-md '>
                                Ventes
                            </div>
                        </div>
                    </div>
                    <div className='w-1/5 h-24 bg-white rounded-lg flex justify-center items-center gap-5'>
                        <div className='w-[60px] h-[60px] bg-orange-500 rounded-full flex justify-center items-center'>
                            <icons.BsFillPeopleFill className='text-3xl text-white'/>
                        </div>
                        <div className=' flex flex-col justify-center items-center '>
                            <div className='text-2xl text-orange-500 font-bold font-Montserrat'>
                                3m
                            </div>
                            <div className='font-light text-black text-md '>
                                Clients
                            </div>
                        </div>
                    </div>
                    <div className='w-1/5 h-24 bg-white rounded-lg flex justify-center items-center gap-5'>
                        <div className='w-[60px] h-[60px] bg-yellow-500 rounded-full flex justify-center items-center'>
                            <icons.FaProductHunt className='text-3xl text-white'/>
                        </div>
                        <div className=' flex flex-col justify-center items-center '>
                            <div className='text-2xl text-yellow-500 font-bold font-Montserrat'>
                                250
                            </div>
                            <div className='font-light text-black text-md '>
                                Produits
                            </div>
                        </div>
                    </div>
                    <div className='w-1/5 h-24 bg-white rounded-lg flex justify-center items-center gap-5'>
                        <div className='w-[60px] h-[60px] bg-green-500 rounded-full flex justify-center items-center'>
                            <icons.FaMoneyBillWave className='text-3xl text-white'/>
                        </div>
                        <div className=' flex flex-col justify-center items-center '>
                            <div className='text-2xl text-green-500 font-bold font-Montserrat'>
                                25m
                            </div>
                            <div className='font-light text-black text-md '>
                                Produits
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[300px] bg-white rounded-lg p-4 flex justify-start items-center flex-col'>
                    <div className='w-full text-start font-bold font-Montserrat text-xl'>Top 10 Ventes</div>
                    <div className='w-full flex flex-col overflow-y-auto'>
                        <div className='flex justify-between items-center h-12 px-2 gap-4 w-full'>
                            <div className='text-gray-400 font-semibold text-start font-Montserrat w-[15%]'>
                            </div>
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
                                Vente
                            </div>
                            <div className='text-gray-400 font-semibold text-start font-Montserrat w-[15%]'>
                                Revenue
                            </div>
                        </div>
                        <hr className='w-full bg-gray-300'/>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center gap-5'>
                    <div className='w-3/5 bg-white h-[300px] rounded-lg p-4'>
                        <div className='w-full text-start font-bold font-Montserrat text-xl'>Notifications</div>
                        <div className='flex flex-col w-full justify-start items-start gap-5 mt-5 overflow-y-auto max-h-[200px]'>
                            <div className='flex flex-col w-full bg-gray-100 p-4 rounded-lg'>
                                <div className='w-full justify-between items-center flex'>
                                    <div className='w-24 text-center flex justify-center items-center rounded-lg text-white font-bold bg-green-500'>
                                        Type
                                    </div>
                                    <div className='w-24 text-center flex justify-center items-center rounded-lg text-white font-bold bg-gray-300'>
                                        New
                                    </div>

                                </div>
                                <div>
                                    Bonjour votre stock de produits Habit est presque épuisé
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-2/5 bg-white h-[300px] rounded-lg p-4'>
                        <div className='w-full text-start font-bold font-Montserrat text-xl'>Top 5 clients</div>
                        <div className='flex flex-col w-full justify-start items-start gap-5 mt-5 overflow-y-auto max-h-[200px]'>
                            <div className='flex justify-start items-start gap-2'>
                                <div className=''>
                                    <img src={img.defaultProfile} alt="Profile" className='w-[50px] h-[50px] rounded-full object-cover '/>
                                </div>
                                <div className='flex flex-col justify-start items-start'>
                                    <span className='text-black text-sm font-bold'>PEZONGO Mickael</span>
                                    <span>2560$</span>
                                </div>
                            </div>
                            <div className='flex justify-start items-start gap-2'>
                                <div className=''>
                                    <img src={img.defaultProfile} alt="Profile" className='w-[50px] h-[50px] rounded-full object-cover '/>
                                </div>
                                <div className='flex flex-col justify-start items-start'>
                                    <span className='text-black text-sm font-bold'>PEZONGO Mickael</span>
                                    <span>2560$</span>
                                </div>
                            </div>
                            <div className='flex justify-start items-start gap-2'>
                                <div className=''>
                                    <img src={img.defaultProfile} alt="Profile" className='w-[50px] h-[50px] rounded-full object-cover '/>
                                </div>
                                <div className='flex flex-col justify-start items-start'>
                                    <span className='text-black text-sm font-bold'>PEZONGO Mickael</span>
                                    <span>2560$</span>
                                </div>
                            </div>
                            <div className='flex justify-start items-start gap-2'>
                                <div className=''>
                                    <img src={img.defaultProfile} alt="Profile" className='w-[50px] h-[50px] rounded-full object-cover '/>
                                </div>
                                <div className='flex flex-col justify-start items-start'>
                                    <span className='text-black text-sm font-bold'>PEZONGO Mickael</span>
                                    <span>2560$</span>
                                </div>
                            </div>
                            <div className='flex justify-start items-start gap-2'>
                                <div className=''>
                                    <img src={img.defaultProfile} alt="Profile" className='w-[50px] h-[50px] rounded-full object-cover '/>
                                </div>
                                <div className='flex flex-col justify-start items-start'>
                                    <span className='text-black text-sm font-bold'>PEZONGO Mickael</span>
                                    <span>2560$</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
