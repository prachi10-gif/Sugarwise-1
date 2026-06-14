'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'conversation_id'
    },
    role: {
      type: DataTypes.ENUM('user', 'assistant'),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'ai_messages',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Conversation, { foreignKey: 'conversation_id', as: 'conversation' });
  };

  return Message;
};
