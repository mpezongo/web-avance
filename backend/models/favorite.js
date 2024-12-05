module.exports = (sequelize) => {
    const Favorite = sequelize.define('Favorite')
    Favorite.associate = (models) => {
        Favorite.belongsTo(models.User, {foreignKey: 'userId', as:'user'})
        Favorite.belongsTo(models.Product, {foreignKey:'productId', as:'product'})
    }

    return Favorite
}