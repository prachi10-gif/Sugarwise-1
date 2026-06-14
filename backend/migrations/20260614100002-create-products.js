'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      barcode: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      brand: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      serving_size_grams: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: true
      },
      total_sugar_per_100g: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: true
      },
      added_sugar_per_100g: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: true
      },
      ingredients_text: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      data_source: {
        type: Sequelize.ENUM('open_food_facts', 'admin_manual', 'user_submitted'),
        defaultValue: 'open_food_facts',
        allowNull: false
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Index on barcode for high-performance scan lookups
    await queryInterface.addIndex('products', ['barcode'], {
      name: 'idx_products_barcode',
      unique: true
    });

    // Index on name for text search
    await queryInterface.addIndex('products', ['name'], {
      name: 'idx_products_name'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  }
};
