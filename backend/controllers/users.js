const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('./authenticate')

const db = require("../models/db");
const { where, AsyncQueueError, Op } = require('sequelize');
const User = db.user
const Session = db.session

const createSession = async (userId, token) => {
    try {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 24);
        const session = await Session.create({
            userId,
            token,
            expirationDate: expirationDate, // 24 heure à partir de maintenant
            role:'admin'
        });
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error);
    }
};
  
exports.register = async (req, res) => {
    const {username, email, password} = req.body
    console.log(username, email, password)
    if (!username || !email || !password){
        res.status(400).json({
            message: "Content can not be empty!"
        });
        return;
    }
    try {
        const existingUser = await User.findOne({where:{email}})

        if (existingUser){
            return res.status(400).json({message:"User already exist"})
        }

        const hashPassword =  await bcrypt.hash(password, 10);
        const user = {
            username,
            email,
            password:hashPassword
        }
    
        User.create(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Tutorial."
                });
            });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message:"An error occured"
        })
    }
}

exports.login = async(req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
        return;
    }
    try{
        const user = await User.findOne({
            where: {
                [Op.or]: [
                  { username: username },
                  { email: username }
                ]
              }
        })
        if (!user){
            return res.status(404).json({message:"User not found"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid){
            console.log("mot de passe incorrect")
            return res.status(401).json({message:"Email ou mot de passe incorrect"})
        }

        const token = jwt.sign(
            {id:user.id, username:user.username, isadmin:user.role},
            "PASSWORD",
            {expiresIn: "1D"}
        )

        await createSession(user.id, token)

        res.cookie("token", token, {
            httpOnly: true,
            secure:true
        }).status(200).json({
            username:user.username,
            email:user.email
        });
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Une erreur s'est produite"})
    }
    
}

exports.logout = async (req, res) => {

    const token = req.cookies.token
    const isAuth = authenticate(token)
    if (!isAuth) {return res.status(401).json({
        message:"Not authorized"
    })}
    else if (isAuth === "isOutDated") {return res.status(401).json({
        message:'Please relogin'
    })}

    res.clearCookie("token")
    return res.status(200).json({message:"Deconnexion reussie"})
}