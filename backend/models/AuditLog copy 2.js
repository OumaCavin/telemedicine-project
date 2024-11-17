// Audit Logs Table
const AuditLog = sequelize.define('AuditLog', {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    action: DataTypes.STRING(255),
    previous_state: DataTypes.TEXT,
    current_state: DataTypes.TEXT,
    affected_table: DataTypes.STRING(255),
    created_by: DataTypes.INTEGER,
  }, {
    tableName: 'telemed_audit_logs',
    timestamps: true,
    createdAt: 'created_at',
  });