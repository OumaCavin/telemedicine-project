// models/Payment.js

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    payment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM('credit_card', 'insurance', 'cash', 'debit_card', 'paypal', 'bank_transfer'),
      allowNull: false,
    },
    currency_code: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: 'KES',
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    reference_number: {
      type: DataTypes.STRING,
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
    tableName: 'telemed_payments',
    timestamps: false,
  });

  // Associations
  Payment.associate = (models) => {
    // A Payment belongs to a Patient (user_id)
    Payment.belongsTo(models.User, { foreignKey: 'patient_id', as: 'patient' });

    // A Payment belongs to an Appointment (appointment_id)
    Payment.belongsTo(models.Appointment, { foreignKey: 'appointment_id', as: 'appointment' });

    // A Payment belongs to a User for created_by and updated_by
    Payment.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    Payment.belongsTo(models.User, { foreignKey: 'updated_by', as: 'updater' });
  };

  return Payment;
};
