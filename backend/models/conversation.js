'use strict';

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
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
    title: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    language: {
      type: DataTypes.ENUM('en', 'hi', 'ta', 'te', 'bn'),
      defaultValue: 'en',
      allowNull: false
    },
    lastMessageAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      field: 'last_message_at'
    }
  }, {
    tableName: 'ai_conversations',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Conversation.associate = (models) => {
    Conversation.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Conversation.hasMany(models.Message, { foreignKey: 'conversation_id', as: 'messages' });
  };

  return Conversation;
};
