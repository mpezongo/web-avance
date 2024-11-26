const db = require("../models/db")
const authenticate = require('./authenticate')
const Product = db.product
const Users = db.user

exports.add = async(req, res) => {
    const token = req.cookies.token
    const isAuth = await authenticate(token)
    if (!isAuth){
        return res.status(401).json({
            message:'Not authorized'
        })
    }else if (isAuth === 'isOutDated'){
        return res.status(401).json({
            message:'Not authorized'
        })
    }
    if (isAuth.role !== 'admin'){
        return res.status(403).json({
            message:'Forbidden action'
        })
    }
    const {name, desc, price, stock, img, categorie} = req.body
    if (!name) return res.status(403).json({
        message:'Un produit doit avoir au moins un nom'
    })

    const product = {
        name:name,
        des:desc,
        price:price,
        stock:stock,
        categorie:categorie,
        img:img
    }

    await Product.create(product)
        .then(data => {
            res.status(200).json({
                message:"Produit ajouté avec succes"
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message:'Une erreur s\'est produite'
            })
        })

}

exports.delete = async(req, res) => {
    const token = req.cookies.token
    const isAuth = await authenticate(token)
    if (!isAuth){
        return res.status(401).json({
            message:'Not authorized'
        })
    }else if (isAuth === 'isOutDated'){
        return res.status(401).json({
            message:'Not authorized'
        })
    }
    if (isAuth.role !== 'admin'){
        return res.status(403).json({
            message:'Forbidden action'
        })
    }
    const id = req.params.id
    try{
        const product = await Product.findByPk(id)
        if (!product){
            return res.status(403).json({
                message:'Product doesn\'t exist'
            })
        }
        await product.destroy();
        res.status(200).json({
            message:'Le produit à bien été supprimé'
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:'Une erreur s\'est produite avec le serveur'
        })
    }
}

exports.modify = async(req, res) => {
    const token = req.cookies.token
    const isAuth = await authenticate(token)
    if (!isAuth){
        return res.status(401).json({
            message:'Not authorized'
        })
    }else if (isAuth === 'isOutDated'){
        return res.status(401).json({
            message:'Not authorized'
        })
    }
    if (isAuth.role !== 'admin'){
        return res.status(403).json({
            message:'Forbidden action'
        })
    }
    const id = req.params.id
    const {name, desc, price, categorie, img, stock} = req.body
    try{
        const product = await Product.findByPk(id)
        if (!product){
            return res.status(403).json({
                message:'Product doesn\'t exist'
            })
        }

        product.name = name || product.name
        product.desc = desc || product.desc
        product.price = price || product.price
        product.categorie = categorie || product.categorie
        product.categorie = categorie || product.categorie
        product.img = img || product.img
        product.stock = stock || product.stock
        await product.save()
        return res.status(200).json({
            message:'Le produit a bien été modifié'
        })
        
    }catch (error){
        console.log(error)
        return res.status(500).json({
            message:'Une erreur s\'est produite avec le serveur'
        })
    }
}

exports.getAllArticles = async(req, res) => {
    const token = req.cookies.token
    const isAuth = await authenticate(token)
    if (!isAuth){
        return res.status(401).json({
            message:'Not authorized'
        })
    }else if (isAuth === 'isOutDated'){
        return res.status(401).json({
            message:'Not authorized'
        })
    }
    const products = await Product.findAll()
    return res.status(200).json(products)
}

exports.getArticle = async(req, res) => {
    const token = req.cookies.token
    const isAuth = await authenticate(token)
    if (!isAuth){
        return res.status(401).json({
            message:'Not authorized'
        })
    }else if (isAuth === 'isOutDated'){
        return res.status(401).json({
            message:'Not authorized'
        })
    }
    const id = req.params.id
    try{
        const product = await Product.findByPk(id)
        if (!product){
            return res.status(403).json({
                message:'Product doesn\'t exist'
            })
        }
        return res.status(200).json(product)
    }catch(error) {
        console.log(error)
        return res.status(500).json({
            message:'Une erreur s\'est produite avec le serveur'
        })
    }
}