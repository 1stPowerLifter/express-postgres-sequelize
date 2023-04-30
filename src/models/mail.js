module.exports = (sequelize, DataTypes) => {
  const Mail = sequelize.define(
    'Mail',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      subject: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      html: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'mails',
    },
  );

  return Mail;
};
