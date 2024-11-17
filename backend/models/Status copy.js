// Status Table
const Status = sequelize.define('Status', {
    status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {
    tableName: 'telemed_status',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });