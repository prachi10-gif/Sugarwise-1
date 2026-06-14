'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    barcode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    servingSizeGrams: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
      field: 'serving_size_grams'
    },
    totalSugarPer100g: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
      field: 'total_sugar_per_100g'
    },
    addedSugarPer100g: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
      field: 'added_sugar_per_100g'
    },
    ingredientsText: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ingredients_text'
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'image_url'
    },
    dataSource: {
      type: DataTypes.ENUM('open_food_facts', 'admin_manual', 'user_submitted'),
      defaultValue: 'open_food_facts',
      allowNull: false,
      field: 'data_source'
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    tableName: 'products',
    underscored: true,
    timestamps: true
  });

  Product.associate = (models) => {
    Product.hasMany(models.Scan, { foreignKey: 'product_id', as: 'scans' });
    Product.hasMany(models.ManualEntry, { foreignKey: 'product_id', as: 'manualEntries' });
  };

  /**
   * Calculate teaspoons of sugar for a given quantity in grams.
   * 1 teaspoon = 4 grams of sugar.
   */
  Product.prototype.calculateTsp = function (quantityGrams = 100) {
    const sugarG = this.totalSugarPer100g
      ? (parseFloat(this.totalSugarPer100g) / 100) * quantityGrams
      : 0;
    return parseFloat((sugarG / 4).toFixed(2));
  };

  Product.prototype.calculateAddedTsp = function (quantityGrams = 100) {
    const sugarG = this.addedSugarPer100g
      ? (parseFloat(this.addedSugarPer100g) / 100) * quantityGrams
      : null;
    return sugarG !== null ? parseFloat((sugarG / 4).toFixed(2)) : null;
  };

  return Product;
};
