module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expirationDate:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
      },
      role:{
        type:DataTypes.STRING,
        defaultValue:'user'
      }
    });
    
    Session.associate = (models) => {
        Session.belongsTo(models.User, {foreignKey:'userId', as:'user'})
    }

    return Session;
};