// models/History.js

module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    history_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    action_time: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: 'telemed_history',
    timestamps: false,
  });

  // Associations
  History.associate = (models) => {
    // History belongs to User (foreign key user_id)
    History.belongsTo(models.User, { foreignKey: 'user_id' });

    // History belongs to Status (foreign key status_id)
    History.belongsTo(models.Status, { foreignKey: 'status_id' });

    // History belongs to User for created_by
    History.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
  };

  return History;
};
