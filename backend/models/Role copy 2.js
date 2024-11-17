// models/Role.js

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
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
  }, {
    tableName: 'telemed_roles',
    timestamps: false,
  });

  // Associations
  Role.associate = (models) => {
    // A Role belongs to a User (for created_by and updated_by)
    Role.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    Role.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });

    // A Role has many RoleAssignments
    Role.hasMany(models.RoleAssignment, { foreignKey: 'role_id' });
  };

  return Role;
};
