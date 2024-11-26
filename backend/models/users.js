module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Cart, { foreignKey: 'userId', as: 'cart' });
    User.hasOne(models.Session, { foreignKey: 'userId', as: 'sessions' })
  }
  return User
}
