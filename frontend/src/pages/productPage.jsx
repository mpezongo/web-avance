import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LeftbarUser from '../components/LeftbarUser'
import { IoIosNotificationsOutline, IoIosArrowDown  } from "react-icons/io";

export default function ProductPage() {

    const [userData] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null; // Parser la chaîne JSON si elle existe
    });

    const [products, setProducts] = useState()
    const [filtedProduct, setFiltredProduct] = useState()
    const [searchText, setSearchText] = useState()

    const filterproduct = (event) => {
        console.log(event.target.value)
        setFiltredProduct(products.filter(product=>product.categorie === event.target.value))
    }

    const searchProduct = () => {
        const searchData = searchText.split(" ")
        console.log(searchData)
        if (searchData){
            const data = []
            searchData.forEach(element => {
                console.log(element)
                products.map((product) => {
                    const textdata = (product.categorie + " " + product.name + " " + product.desc)
                    const textDataSplit = textdata.split(" ")
                    console.log(textDataSplit)
                    textDataSplit.forEach(textDataSplitElement => {
                        if(element === textDataSplitElement){
                            data.push(product)
                        }
                    })
                    return data
                })
            });
            setFiltredProduct(data)
        }
    }
    useEffect(() => {
        if (!userData) {
            return window.location.href = '/login'
        }
        const fnc = async() => {
          try{
            const res = await axios.get("http://localhost:5000/products", {
              withCredentials:true
            })
    
            setProducts(res.data)
            setFiltredProduct(res.data)
          }catch(error){
            
          }
        }
    
        fnc()
    }, [userData])

    const addCart = async(productId) => {
        try{
            const res = axios.post("http://localhost:5000/cart", {
                productId:productId
            }, {withCredentials:true})
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }

    console.log(filtedProduct)

  return (
    <div className='w-full h-screen relative bg-blue-100 flex'>
        <LeftbarUser products={products}/>
        <div className='w-4/5 relative h-auto flex flex-col justify-start items-center bg-blue-100 overflow-y-auto'>
            <div className='bg-white w-full h-auto py-4 flex justify-between px-4 items-center'>
                <div className='w-[400px] h-12 border-[1px] rounded-lg border-gray-300 flex justify-between items-center pl-4'>
                    <input type="text" placeholder='Rechercher...' className='bg-transparent outline-none w-4/6' onChange={(event) => setSearchText(event.target.value)}/>
                    <button onClick={searchProduct} className='bg-blue-800 h-full text-white w-2/6 rounded-r-lg'>Search</button>
                </div>
                <div className='flex justify-between items-center w-[200px]'>
                    <IoIosNotificationsOutline />
                    <div className='w-[30px] h-[30px] rounded-full bg-gray-300'>

                    </div>
                    <div className='font-Montserrat font-bold font-xl'>
                        {userData?.username}
                    </div>
                    <IoIosArrowDown />
                </div>
            </div>
            <div className='w-[95%] mt-10'>
                <select name="categorie" id="categorie" className='font-light border-[1px]  border-gray-300 h-10 w-[300px] px-2 rounded-lg outline-none' onChange={filterproduct}>
                    <option value="">Filtrer</option>
                    <option value="Téléphone">Téléphone</option>
                    <option value="Ordinateur">Ordinateur</option>
                    <option value="Accessoires">Accessoires</option>
                </select>
            </div>
            <div className='w-[95%] h-auto mt-10 flex justify-between flex-wrap items-center gap-10 gap-y-10'>
                {
                    filtedProduct &&
                    filtedProduct.map((product, index) => (
                        <div className='w-[22%] bg-white h-auto rounded-lg flex flex-col'>
                            <img src={"http://localhost:5000/static/img/"+product.img} alt="" className='w-full h-[300px] object-contain rounded-lg' />
                            <div className='w-full h-28 bg-blue-800 p-4 overflow-y-auto'>
                                <h2 className='text-white font-Montserrat font-bold text-2xl'>
                                    {product.price}$
                                </h2>
                                <div className='text-green-500'>
                                    {product.name}
                                </div>
                                <div className='text-xs text-justify text-gray-400'>
                                    {product.desc}
                                </div>
                            </div>
                            <div className='w-full flex rounded-b-lg '>
                                <button onClick={() => addCart(product.id)} className='w-full h-[50px] rounded-b-lg bg-green-700/70 text-white font-bold text-lg hover:bg-green-700 duration-1000'>Ajouter au panier</button>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
