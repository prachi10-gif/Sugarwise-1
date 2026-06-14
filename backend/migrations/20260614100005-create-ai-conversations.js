'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ai_conversations', {
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
      title: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      language: {
        type: Sequelize.ENUM('en', 'hi', 'ta', 'te', 'bn'),
        defaultValue: 'en',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      last_message_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Index for listing user conversations sorted by recency
    await queryInterface.addIndex('ai_conversations', ['user_id', 'last_message_at'], {
      name: 'idx_ai_conversations_user_last_msg'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('ai_conversations');
  }
};
