const db = require("../models/db")
const authenticate = require('./authenticate')

exports.addProductImg = async(req, res) => {
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
    const productImg = req.file;
    res.status(200).json({
        productImg: productImg.filename,
    });
}