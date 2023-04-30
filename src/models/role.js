module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'roles',
    },
  );

  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
    });
  };
  return Role;
};
