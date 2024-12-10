module.exports = (sequelize, DataTypes) => {
    const Commandes = sequelize.define('Commandes', {
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        status: {
            type: DataTypes.ENUM('processing', 'delivering', 'completed'),
            defaultValue: 'processing',
        },
    });

    Commandes.associate = (models) => {
        Commandes.belongsTo(models.User, {foreignKey:'userId'});
        Commandes.belongsTo(models.Product, {foreignKey:'productId'});
    }
    return Commandes
}