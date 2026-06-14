'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      diabetes_type: {
        type: Sequelize.ENUM('none', 'pre-diabetic', 'type1', 'type2'),
        defaultValue: 'none',
        allowNull: false
      },
      weight_kg: {
        type: Sequelize.DECIMAL(5, 1),
        allowNull: true
      },
      height_cm: {
        type: Sequelize.DECIMAL(5, 1),
        allowNull: true
      },
      preferred_language: {
        type: Sequelize.ENUM('en', 'hi', 'ta', 'te', 'bn'),
        defaultValue: 'en',
        allowNull: false
      },
      daily_sugar_goal_tsp: {
        type: Sequelize.DECIMAL(4, 1),
        defaultValue: 6.0,
        allowNull: false
      },
      is_admin: {
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
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
