const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const db = require("./models/db")
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const favoriteRouter = require('./routes/favorites')
const commandesRouter = require('./routes/commandes')
const routerSendImg = require('./routes/img')
const multer = require("multer");

const app = express()
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json());

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./file/productImg");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

db.sequelize.sync()
  .then(() => {
    console.log('Base de données synchronisée.');
  })
  .catch(err => {
    console.error('Erreur de synchronisation de la base de données:', err);
  });

app.get('/', (req, res) => {
  res.send("Bonjour le serveur est actif")
})

const uploadFile= multer({ storage: storageFile });

app.use("/users", usersRouter)
app.use('/products', productsRouter)
app.use('/cart', cartRouter)
app.use('/favorite', favoriteRouter)
app.use('/commandes', commandesRouter)
app.use("/img", uploadFile.single("file"), routerSendImg)
app.use("/static/img", express.static("file/productImg"))


app.listen(5000, () => {
    console.log("server is start")
})