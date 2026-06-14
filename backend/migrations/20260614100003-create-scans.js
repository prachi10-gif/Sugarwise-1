'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('scans', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      session_id: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      barcode_raw: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      total_sugar_tsp: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      added_sugar_tsp: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true
      },
      quantity_grams: {
        type: Sequelize.DECIMAL(7, 2),
        defaultValue: 100,
        allowNull: false
      },
      scanned_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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

    // Composite index for user history queries sorted by time
    await queryInterface.addIndex('scans', ['user_id', 'scanned_at'], {
      name: 'idx_scans_user_scanned_at'
    });

    // Index for anonymous session lookups
    await queryInterface.addIndex('scans', ['session_id'], {
      name: 'idx_scans_session_id'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('scans');
  }
};
