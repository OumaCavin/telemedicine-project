// Role Items Table
const RoleItem = sequelize.define('RoleItem', {
    role_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: DataTypes.INTEGER,
    permission: DataTypes.STRING(255),
    description: DataTypes.TEXT,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {
    tableName: 'telemed_role_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });