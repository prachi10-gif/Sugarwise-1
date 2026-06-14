'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('manual_entries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      item_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      input_type: {
        type: Sequelize.ENUM('grams', 'bowl', 'glass', 'cup', 'piece'),
        allowNull: false
      },
      input_amount: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false
      },
      input_amount_grams: {
        type: Sequelize.DECIMAL(7, 2),
        allowNull: false
      },
      total_sugar_tsp: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
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
      entered_at: {
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

    // Index for user history queries
    await queryInterface.addIndex('manual_entries', ['user_id', 'entered_at'], {
      name: 'idx_manual_entries_user_entered_at'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('manual_entries');
  }
};
