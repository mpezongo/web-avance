const db = require("../models/db")
const authenticate = require('./authenticate')
const Product = db.product
const User = db.user
const Favorite = db.favorite
const CartProducts = db.cartProducts

exports.addDelToFavorite = async(req, res) => {
    const token = req.cookies.token
    const isAuth = await authenticate(token)
    if (!isAuth){
        return res.status(401).json({
            message:'Not authorized yet'
        })
    }else if (isAuth === 'isOutDated'){
        return res.status(401).json({
            message:'Not authorized'
        })
    }
    try{
        const productId = req.body.productId
        const userId = isAuth.userId
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const favorites = await Favorite.findOne({where:{userId:userId, productId:productId}})
        if (favorites){
                await favorites.destroy()
        }else{
            await Favorite.create({
                userId:userId,
                productId:productId
            })
        }
        return res.status(200).json({
            message:'Produit ajoutée au favoris avec succès'
        })
    }catch(error){
        return res.status(500).json({
            message:'Une erreur s\'est produite'
        })
    }
}

exports.getFavorites = async(req, res) => {
    const token = req.cookies.token
    const isAuth = await authenticate(token)
    if (!isAuth){
        return res.status(401).json({
            message:'Not authorized yet'
        })
    }else if (isAuth === 'isOutDated'){
        return res.status(401).json({
            message:'Not authorized'
        })
    }
    try{
        const favorites = await Favorite.findAll({
            where:{userId:isAuth.userId},
            include: [
                {
                    model: Product,
                    as: 'product',
                },
            ],
        })
        return res.status(200).json(favorites)
    }catch(error){
        return res.status(500).json({
            message:'Une erreur s\'est produite'
        })
    }
}