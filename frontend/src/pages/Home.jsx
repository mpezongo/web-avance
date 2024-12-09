import React from 'react'
import axios from 'axios'

export default function Home() {


    const handleSend = async() => {
        try{
            const res = await axios.delete("http://localhost:5000/commandes/8", 
            //   {
            //     "username":"mpezongo",
            //     "email":"mickael.pezongo@gmail.com",
            //     "password":"1234",
            //     name:'Un habit bien neud',
            //     price:1426,
            //     desc:'Ce produit est tres special',
            //     categorie:'habit',
            //     productId:4,
            //     items:[
            //       {
            //         productId:7,
            //         quantity:1
            //       },
            //       {
            //         productId:8,
            //         quantity:2
            //       },
            //     ]
            //     // quantity:8

            // },
            {
                withCredentials:true
            })
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div>
      <button onClick={handleSend}>Send request</button>
    </div>
  )
}
