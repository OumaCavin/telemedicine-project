// models/RoleAssignment.js

module.exports = (sequelize, DataTypes) => {
  const RoleAssignment = sequelize.define('RoleAssignment', {
    role_assignment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
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
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'telemed_role_assignments',
    timestamps: false,
  });

  // Associations
  RoleAssignment.associate = (models) => {
    // A RoleAssignment belongs to a User
    RoleAssignment.belongsTo(models.User, { foreignKey: 'user_id' });

    // A RoleAssignment belongs to a Role
    RoleAssignment.belongsTo(models.Role, { foreignKey: 'role_id' });

    // A RoleAssignment belongs to a User for created_by and updated_by
    RoleAssignment.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    RoleAssignment.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
  };

  return RoleAssignment;
};
