// models/State.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const State = sequelize.define('State', {
  state_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  state_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'state',
  timestamps: false
});

// Static method to create default Indian states
State.createDefaultStates = async () => {
  try {
    const existingStates = await State.count();
    
    if (existingStates === 0) {
      const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        // Union Territories
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
      ];

      const stateData = indianStates.map(stateName => ({ state_name: stateName }));
      await State.bulkCreate(stateData);
      console.log('✅ Default Indian states created successfully');
    }
  } catch (error) {
    console.error('❌ Error creating default states:', error.message);
  }
};

export default State;