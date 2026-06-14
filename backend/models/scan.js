'use strict';

module.exports = (sequelize, DataTypes) => {
  const Scan = sequelize.define('Scan', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'user_id'
    },
    sessionId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'session_id'
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'product_id'
    },
    barcodeRaw: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'barcode_raw'
    },
    totalSugarTsp: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      field: 'total_sugar_tsp'
    },
    addedSugarTsp: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      field: 'added_sugar_tsp'
    },
    quantityGrams: {
      type: DataTypes.DECIMAL(7, 2),
      defaultValue: 100,
      allowNull: false,
      field: 'quantity_grams'
    },
    scannedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'scanned_at'
    }
  }, {
    tableName: 'scans',
    underscored: true,
    timestamps: true
  });

  Scan.associate = (models) => {
    Scan.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Scan.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return Scan;
};
