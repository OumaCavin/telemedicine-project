// Payments Table
const Payment = sequelize.define('Payment', {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_id: DataTypes.INTEGER,
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    payment_method: {
      type: DataTypes.ENUM('credit_card', 'insurance', 'cash', 'debit_card', 'paypal', 'bank_transfer'),
      allowNull: false,
    },
    currency_code: {
      type: DataTypes.CHAR(3),
      defaultValue: 'KES',
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending',
    },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
  }, {
    tableName: 'telemed_payments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });