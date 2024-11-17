module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      message_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    }, {
      tableName: 'telemed_messages',
      timestamps: false,
    });
  
    // Associations
    Message.associate = (models) => {
      // A Message belongs to a User
      Message.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  
      // A Message tracks created_by and updated_by relationships
      Message.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      Message.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
    };
  
    return Message;
  };
  