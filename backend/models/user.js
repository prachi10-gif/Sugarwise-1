'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'date_of_birth'
    },
    diabetesType: {
      type: DataTypes.ENUM('none', 'pre-diabetic', 'type1', 'type2'),
      defaultValue: 'none',
      allowNull: false,
      field: 'diabetes_type'
    },
    weightKg: {
      type: DataTypes.DECIMAL(5, 1),
      allowNull: true,
      field: 'weight_kg'
    },
    heightCm: {
      type: DataTypes.DECIMAL(5, 1),
      allowNull: true,
      field: 'height_cm'
    },
    preferredLanguage: {
      type: DataTypes.ENUM('en', 'hi', 'ta', 'te', 'bn'),
      defaultValue: 'en',
      allowNull: false,
      field: 'preferred_language'
    },
    dailySugarGoalTsp: {
      type: DataTypes.DECIMAL(4, 1),
      defaultValue: 6.0,
      allowNull: false,
      field: 'daily_sugar_goal_tsp'
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      field: 'is_admin'
    }
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ['passwordHash'] }
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Scan, { foreignKey: 'user_id', as: 'scans' });
    User.hasMany(models.ManualEntry, { foreignKey: 'user_id', as: 'manualEntries' });
    User.hasMany(models.Conversation, { foreignKey: 'user_id', as: 'conversations' });
  };

  // Instance method: strip password hash from JSON output
  User.prototype.toSafeJSON = function () {
    const values = { ...this.get() };
    delete values.passwordHash;
    delete values.password_hash;
    return values;
  };

  return User;
};
