module.exports = (sequelize, DataTypes) => {
    const CartProducts = sequelize.define('CartProducts', {
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    });
  
    CartProducts.associate = (models) => {
      CartProducts.belongsTo(models.Cart, { foreignKey: 'cartId'});
      CartProducts.belongsTo(models.Product, { foreignKey: 'productId'});
  };
    return CartProducts;
};