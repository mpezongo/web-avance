import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import Leftbar from '../components/Leftbar'
import Topbar from '../components/Topbar'
import icons from '../constants/icons'

export default function AddProduct() {

    const [productImg, setProductImg] = useState()
    const [productData, setProductData] = useState({
        name:"",
        price:"",
        desc:"",
        categorie:"",
        stock:""
    })
    const [error, setError] = useState()


    const handleChangeProductData = (event) => {
        event.preventDefault()
        setProductData({...productData, [event.target.name]:event.target.value})
    }
    const handleChangeImg = () => {
        console.log("salut")
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/jpg, image/png, image/jpeg";
        fileInput.onchange = async (event) => {
          const file = event.target.files[0];
          try {
            console.log(file)
            setProductImg(file);
          } catch (error) {
            console.error("Erreur lors de la récupération de la taille de l'image:", error);
          }
        };
        fileInput.click();
    }

    const uploadImg = async(img) => {
        try {
            const formData = new FormData();
            formData.append("file", img);
            const res = await axios.post("http://localhost:5000/img", formData, {
              withCredentials:true
            });
            return res.data.productImg;
        }catch (err) {
            console.log(err);
        }
    }

    const handleAddProduct = async(event) => {
        event.preventDefault()
        const newErrors = {}
        const {name, price} = productData
        if (!name) newErrors.name = "Veuillez entrer le nom du produit"
        if (!price) newErrors.price = "Veuillez entrer un prix pour le produit"
        if (!productImg) newErrors.img = "Veuillez selectionner une image pour le produit"
        if (Object.keys(newErrors).length > 0) return setError(newErrors)
        const productImgUrl = await uploadImg(productImg)
        try{
            const res = await axios.post("http://localhost:5000/products", {
                img:productImgUrl,
                productData
            }, {withCredentials:true})

            console.log(res)
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className='w-full h-screen relative bg-blue-100 flex'>
        <Leftbar />
        <div className='w-4/5 relative h-auto flex flex-col justify-start items-center bg-blue-100 overflow-y-auto'>
            <Topbar />
            <div className='w-[700px] bg-white h-auto mt-10 rounded-xl p-12 mb-10'>
                <div className='flex justify-between items-center h-24 '>
                    <span className='font-bold text-xl font-Montserrat'>Ajout d'un nouveau produit</span>
                    <NavLink to="/adminProduct" className="flex gap-2 justify-center items-center text-blue-600 rounded-lg h-12 px-2 duration-150 hover:bg-gray-100">
                        <icons.IoIosArrowRoundBack />
                        Retour à la liste
                    </NavLink>
                </div>
                <form className='flex flex-col gap-2 w-full'>
                    <label htmlFor="name" className='flex flex-col justify-center items-start gap-1 font-semibold'>
                        Nom du produit
                        <input type="text" id='name' name='name' placeholder='Entrez le nom du produit'
                            className='border-[1px]  border-gray-300 h-10 w-full px-2 rounded-lg outline-none font-light' onChange={handleChangeProductData}
                        />
                        {
                            error && error.name &&
                            <span className='text-red-500'>{error.name}</span>
                        }
                    </label>
                    <label htmlFor="categorie" className='flex flex-col justify-center items-start gap-1 font-semibold'>
                        Catégorie du produit
                        <select name="categorie" id="categorie" className='font-light border-[1px]  border-gray-300 h-10 w-full px-2 rounded-lg outline-none' onChange={handleChangeProductData}>
                            <option value="">Selectionner une catégorie</option>
                            <option value="Téléphone">Téléphone</option>
                            <option value="Ordinateur">Ordinateur</option>
                            <option value="Accessoires">Selectionner une catégorie</option>
                        </select>
                    </label>
                    <label htmlFor="price" className='flex flex-col justify-center items-start gap-1 font-semibold'>
                        Prix du produit
                        <input type="number" id='price' name='price' placeholder='0.00' step='0.01' min='0.00' onChange={handleChangeProductData}
                            className='border-[1px]  border-gray-300 h-10 w-full px-2 rounded-lg outline-none font-light'
                        />
                        {
                            error && error.price &&
                            <span className='text-red-500'>{error.price}</span>
                        }
                    </label>
                    <label htmlFor="stock" className='flex flex-col justify-center items-start gap-1 font-semibold'>
                        Stock du produit
                        <input type="number" id='stock' name='stock' placeholder='0' step='1' min='0' onChange={handleChangeProductData}
                            className='border-[1px]  border-gray-300 h-10 w-full px-2 rounded-lg outline-none font-light'
                        />
                    </label>
                    <label htmlFor="desc" className='flex flex-col justify-center items-start gap-1 font-semibold'>
                        Description du produit
                        <textarea id='desc' name='desc' placeholder='Entrez une description du produit' onChange={handleChangeProductData}
                            className='border-[1px]  border-gray-300 w-full px-2 rounded-lg outline-none font-light h-24'
                        />
                    </label>
                    <label htmlFor="image" className='flex flex-col justify-center items-start gap-1 font-semibold'>
                        Image du produit
                        <div onClick={handleChangeImg} className='cursor-pointer'>
                        {
                                productImg 
                                ? <img src={URL.createObjectURL(productImg)} alt="product" className='w-24 h-24 object-cover' />
                                :<span className='flex font-light justify-center items-center underline'>
                                    <icons.CiFileOn />
                                    Selectionner une image
                                </span>
                        }
                        </div>
                        {
                            error && error.img &&
                            <span className='text-red-500'>{error.img}</span>
                        }
                    </label>
                    <div className='w-full justify-end flex mt-5'>
                        <button onClick={handleAddProduct} className='w-[200px] bg-blue-700 h-12 text-white font-bold rounded-lg'>
                            Ajouter le produit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
