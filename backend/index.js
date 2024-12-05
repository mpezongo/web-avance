const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const db = require("./models/db")
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const favoriteRouter = require('./routes/favorites')

const app = express()
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json());

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

app.use("/users", usersRouter)
app.use('/products', productsRouter)
app.use('/cart', cartRouter)
app.use('/favorite', favoriteRouter)


app.listen(5000, () => {
    console.log("server is start")
})