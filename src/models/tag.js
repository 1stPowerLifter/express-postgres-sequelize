module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: 'tags',
    },
  );

  Tag.associate = function (models) {
    Tag.belongsToMany(models.Post, { through: models.Post_Tag, foreignKey: 'tagId', onDelete: 'CASCADE' });
  };
  return Tag;
};
