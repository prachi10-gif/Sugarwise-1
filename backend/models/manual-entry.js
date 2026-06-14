'use strict';

module.exports = (sequelize, DataTypes) => {
  const ManualEntry = sequelize.define('ManualEntry', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    },
    itemName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'item_name'
    },
    inputType: {
      type: DataTypes.ENUM('grams', 'bowl', 'glass', 'cup', 'piece'),
      allowNull: false,
      field: 'input_type'
    },
    inputAmount: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
      field: 'input_amount'
    },
    inputAmountGrams: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
      field: 'input_amount_grams'
    },
    totalSugarTsp: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: 'total_sugar_tsp'
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'product_id'
    },
    enteredAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'entered_at'
    }
  }, {
    tableName: 'manual_entries',
    underscored: true,
    timestamps: true
  });

  ManualEntry.associate = (models) => {
    ManualEntry.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    ManualEntry.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return ManualEntry;
};
