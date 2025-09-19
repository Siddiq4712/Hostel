import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import Type from './Type.js';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Type',
      key: 'type_id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_on: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_on: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user',
  timestamps: false,
  hooks: {
    beforeUpdate: (user) => {
      user.updated_on = new Date();
    }
  }
});

// Associations
User.belongsTo(Type, {
  foreignKey: 'type_id',
  as: 'userType'
});

export default User;