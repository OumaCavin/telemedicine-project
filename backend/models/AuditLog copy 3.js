// models/AuditLog.js

module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define('AuditLog', {
    log_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    previous_state: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    current_state: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    affected_table: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'telemed_audit_logs',
    timestamps: false, // We manage `created_at` manually
  });

  // Associations
  AuditLog.associate = (models) => {
    // An AuditLog belongs to a User (user_id) for the user performing the action
    AuditLog.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });

    // An AuditLog has a relationship with the User (created_by) for the user who created the log
    AuditLog.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
  };

  return AuditLog;
};
