// models/RoleItem.js

module.exports = (sequelize, DataTypes) => {
  const RoleItem = sequelize.define('RoleItem', {
    role_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'telemed_role_items',
    timestamps: false,
  });

  // Associations
  RoleItem.associate = (models) => {
    // A RoleItem belongs to a Role
    RoleItem.belongsTo(models.Role, { foreignKey: 'role_id' });

    // A RoleItem belongs to a User for created_by and updated_by
    RoleItem.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    RoleItem.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
  };

  return RoleItem;
};
