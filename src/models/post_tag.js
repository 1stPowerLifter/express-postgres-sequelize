module.exports = (sequelize, DataTypes) => {
  const Post_Tag = sequelize.define(
    'Post_Tag',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Post',
          key: 'id',
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tag',
          key: 'id',
        },
      },
    },
    {
      tableName: 'post_tags',
    },
  );
  return Post_Tag;
};
