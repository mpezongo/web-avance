module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        status: {
            type: DataTypes.ENUM('active', 'completed'),
            defaultValue: 'active',
        },
    });
    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {foreignKey:'userId', as: 'user'});
        Cart.belongsToMany(models.Product, {through:models.CartProducts, foreignKey:'cartId', as:'products'});
    }
    return Cart;
}