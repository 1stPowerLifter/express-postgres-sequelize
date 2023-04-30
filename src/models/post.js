module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      tableName: 'posts',
    },
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Post.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
    Post.belongsToMany(models.Tag, { through: models.Post_Tag, foreignKey: 'postId', onDelete: 'CASCADE' });
  };

  return Post;
};
