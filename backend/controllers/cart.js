const db = require("../models/db")
const authenticate = require('./authenticate')
const Product = db.product
const User = db.user
const Cart = db.cart
const CartProducts = db.cartProducts

exports.addProduct = async(req, res) => {
    console.log('on est la')
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
    try{
        const productId = req.body.productId
        const quantity = req.body.quantity
        console.log("productId ===== ", productId)
        const userId = isAuth.userId
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let cart = await Cart.findOne({where:{userId:user.id}})
        console.log("mickkkkkkkkkkk")
        if (!cart){
            cart = await Cart.create({
                userId:user.id
            })
        }
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cartProduct = await CartProducts.findOne({ where: { cartId:cart.id, productId:productId } });
        
        if (cartProduct) {
            cartProduct.quantity += quantity;
            await cartProduct.save();
        } else {
            cartProduct = await CartProducts.create({
                cartId:cart.id,
                productId:productId,
                quantity:quantity
            });
        }
        return res.status(200).json({
            message:'Produit ajoutée au panier avec succès'
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:'Une erreur s\'est produite'
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
    try{
        const userId = isAuth.userId
        const productId = req.body.productId
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cart = await Cart.findOne({where:{userId:user.id}});
        if (!cart){
            res.status(404).json({
                message:'Votre panier est vide'
            })
        }

        let cartProduct = await CartProducts.findOne({ where: { cartId:cart.id, productId:productId } });
        if (cartProduct) {
            if (cartProduct.quantity === 1){
                cartProduct.detroy()
                return res.status(200).json({
                    message:'Produit supprimer avec succès'
                })
            }
            cartProduct.quantity -= 1;
            await cartProduct.save();
            return res.status(200).json({
                message:'Quantité modifiée avec succès'
            })
        } else {
            res.status(403).json({
                message:'Ce produit n\'existe pas dans votre panier'
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:'Une erreur s\'est produite'
        })
    }
}

exports.deleteProduct = async(req, res) => {
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
    try{
        const userId = isAuth.userId
        const productId = req.params.productId
        console.log(productId)
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cart = await Cart.findOne({where:{userId:user.id}});
        if (!cart){
            res.status(404).json({
                message:'Votre panier est vide'
            })
        }

        let cartProduct = await CartProducts.findOne({ where: { cartId:cart.id, productId:productId } });
        if (cartProduct) {
            await cartProduct.destroy()
            return res.status(200).json({
                message:'Produit supprimer avec succès'
            })
        } else {
            res.status(403).json({
                message:'Ce produit n\'existe pas dans votre panier'
            })
        }

    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:'Une erreur s\'est produite'
        })
    }
}

exports.getCart = async(req, res) => {
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
    try{
        const userId = isAuth.userId
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cart = await Cart.findOne({where:{userId:user.id}});
        if (!cart){
            res.status(404).json({
                message:'Votre panier est vide'
            })
        }

        const cartProducts = await CartProducts.findAll({where:{cartId:cart.id},
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'img']
            }]
        })
        res.status(200).json(cartProducts);
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:'Une erreur s\'est produite'
        })
    }
}