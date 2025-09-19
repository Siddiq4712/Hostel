// models/Type.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Type = sequelize.define('Type', {
  type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  type_description: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'type',
  timestamps: false
});

// Static method to create default types
Type.createDefaultTypes = async () => {
  try {
    const existingTypes = await Type.count();
    
    if (existingTypes === 0) {
      await Type.bulkCreate([
        {
          type_id: 1,
          type_name: 'Admin',
          type_description: 'Principal or Administrator with full system access'
        },
        {
          type_id: 2,
          type_name: 'Store',
          type_description: 'Hostel Mess or Store Manager'
        },
        {
          type_id: 3,
          type_name: 'Retailer',
          type_description: 'Supplier or Shop Owner'
        }
      ]);
      console.log('✅ Default user types created successfully');
    }
  } catch (error) {
    console.error('❌ Error creating default types:', error.message);
  }
};

export default Type;