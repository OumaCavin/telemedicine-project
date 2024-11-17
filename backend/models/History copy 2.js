// History Table
const History = sequelize.define('History', {
    history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: DataTypes.STRING(255),
    action_time: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    created_by: DataTypes.INTEGER,
  }, {
    tableName: 'telemed_history',
  });