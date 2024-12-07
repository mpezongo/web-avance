module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Articles', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: true
        },
        stock:{
            type:Sequelize.INTEGER,
            allowNull:true,
            default:0
        },
        img:{
            type:Sequelize.STRING,
            allowNull:true
        },
        desc:{
            type:Sequelize.STRING,
            allowNull:true
        },
        categorie:{
            type:Sequelize.STRING,
            allowNull:true
        }
    });
    Product.associate = (models) => {
        Product.belongsToMany(models.Cart, { 
            through: models.CartProducts, 
            foreignKey: 'productId' 
        });
    };
    return Product;
}