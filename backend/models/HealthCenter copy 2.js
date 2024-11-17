module.exports = (sequelize, DataTypes) => {
    const HealthCenter = sequelize.define('HealthCenter', {
      center_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      location: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: true,
      },
      contact_info: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('hospital', 'clinic', 'lab'),
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
      tableName: 'telemed_health_centers',
      timestamps: false,
    });
  
    // Associations
    HealthCenter.associate = (models) => {
      // HealthCenter tracks created_by and updated_by relationships
      HealthCenter.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      HealthCenter.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
    };
  
    return HealthCenter;
  };
  