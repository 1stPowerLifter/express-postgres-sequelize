module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      token: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      origin: {
        type: DataTypes.ENUM('homepage', 'google', 'facebook'),
        defaultValue: 'homepage',
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'users',
    },
  );

  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
    });
    User.hasMany(models.Post, {
      foreignKey: 'userId',
    });
  };

  return User;
};
