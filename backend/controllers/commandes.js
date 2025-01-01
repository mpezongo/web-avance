const commandes = require("../models/commandes")
const db = require("../models/db")
const authenticate = require('./authenticate')
const User = db.user
const Commandes = db.commandes
const Product = db.product
const Cart = db.cart

exports.addCommande = async(req, res) => {
    const token = req.cookies.token
    const isAuth = await authenticate(token)
    if (!isAuth){
        return res.status(401).json({
            message:'Not authorized'
        })
    }else if (isAuth === 'isOutDated'){
        return res.status(401).json({
            message:'Not authorized etghrt'
        })
    }
    try{
        const items = req.body.items
        const productIds = items.map(item => item.productId);
        const cartId = req.body.cartId
        console.log(cartId)
        const products = await Product.findAll({
            where: { id: productIds },
        });

        console.log(productIds.length)

        if (products.length !== productIds.length) {
            return res.status(404).json({ message: 'Un ou plusieurs produits n\'existe pas' });
        }
        const commandes = items.map(item => ({
            productId:item.productId,
            userId:isAuth.userId,
            quantity:item.quantity
        }))
        await Commandes.bulkCreate(commandes)
        const cart = await Cart.findOne({where:{id:cartId}});
        if (cart){
            cart.destroy()
        }else{
            console.log("kjladshvjfdhljkvbfjk")
        }
        return res.status(200).json({message:'Votre commande a bien été placée'})
    }catch(error) {
        console.log(error)
        return res.status(500).json({message:'Une erreur s\'est produite'})
    }
}

exports.getCommande = async(req, res) => {
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

    try{
        const commandes = await Commandes.findAll(
            {
                include:[
                    {
                        model:Product,
                    },
                    {
                        model:User,
                        attributes: ['username'],
                    }
                ]
            }
        )
        res.status(200).json(commandes)
    }catch(error) {
        console.log(error)
    }

}

exports.getCommandeByUser = async(req, res) => {
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
        const commandes = await Commandes.findAll(
            {
                where:{userId:isAuth.userId},
                include:[{
                    model:Product
                }]
            },
        )
        res.status(200).json(commandes)
    }catch(error){
        console.log(error)
    }
}

exports.deleteCommande = async(req, res) => {
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
        const productId = req.params.id
        console.log(productId)
        let commande;
        if (isAuth.role === "admin"){
            commande = await Commandes.findOne({where:{productId:productId}})
        }else{
            commande = await Commandes.findOne({where:{userId:isAuth.userId, productId:productId}})
        }
        if (commande){
            commande.destroy()
            res.status(200).json({message:'Commandes supprimée avec succès'})
        }else{
            res.status(403).json({message:"Cette commande n'existe pas"})
        }
    }catch(error){
        console.log(error)
    }
}

exports.getCommandeById = async(req, res) => {
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
        const commandeId = req.params.id
        const commande = await Commandes.findOne({where:{id:commandeId}})
        res.status(200).json(commande)
    }catch(error){
        console.log(error)
    }
}

exports.updateCommande = async(req, res) => {
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
    const {quantity, status} = req.body
    console.log(req.body)
    try{
        const commande = await Commandes.findByPk(id)
        if (!commande){
            return res.status(403).json({message:"Cette commande n'existe pas"})
        }else{
            commande.quantity = quantity || commande.quantity
            commande.status = status
            await commande.save()
            return res.status(200).json({
                message:'Le commande a bien été modifié'
            })
        }
    }catch(error){
        console.log(error)
    }
}