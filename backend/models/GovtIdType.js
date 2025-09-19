// models/GovtIdType.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const GovtIdType = sequelize.define('GovtIdType', {
  type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'govt_id_type',
  timestamps: false
});

// Static method to create default government ID types
GovtIdType.createDefaultIdTypes = async () => {
  try {
    const existingTypes = await GovtIdType.count();
    
    if (existingTypes === 0) {
      await GovtIdType.bulkCreate([
        { type_id: 1, type_name: 'Aadhar Card' },
        { type_id: 2, type_name: 'PAN Card' },
        { type_id: 3, type_name: 'Driving License' },
        { type_id: 4, type_name: 'Voter ID' },
        { type_id: 5, type_name: 'Passport' },
        { type_id: 6, type_name: 'Ration Card' }
      ]);
      console.log('✅ Default government ID types created successfully');
    }
  } catch (error) {
    console.error('❌ Error creating default government ID types:', error.message);
  }
};

export default GovtIdType;