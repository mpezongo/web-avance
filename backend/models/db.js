const dbConfig = require("../config/db.conf.js");
const {Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

User = require("./users.js")(sequelize, Sequelize);
Product = require("./product.js")(sequelize, Sequelize);
Cart = require("./cart.js")(sequelize, DataTypes);
CartProducts = require('./cartProducts.js')(sequelize, DataTypes)
Session = require('./session.js')(sequelize, DataTypes)
Favorite = require('./favorite.js')(sequelize)
Commandes = require('./commandes.js')(sequelize, DataTypes)

User.associate({ Cart, Session })
Cart.associate({User, Product, CartProducts})
Product.associate({Cart, CartProducts});
CartProducts.associate({Cart, Product});
Session.associate({User})
Favorite.associate({User, Product})
Commandes.associate({User, Product})

db.user = User;
db.cart = Cart;
db.product = Product;
db.cartProducts = CartProducts;
db.session = Session
db.favorite = Favorite
db.commandes = Commandes


module.exports = db;

