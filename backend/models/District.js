// models/District.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import State from './State.js';

const District = sequelize.define('District', {
  district_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  district_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'State',
      key: 'state_id'
    }
  }
}, {
  tableName: 'district',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['district_name', 'state_id']
    }
  ]
});

// Associations
District.belongsTo(State, {
  foreignKey: 'state_id',
  as: 'state'
});

State.hasMany(District, {
  foreignKey: 'state_id',
  as: 'districts'
});

// Static method to create some sample districts
District.createSampleDistricts = async () => {
  try {
    const existingDistricts = await District.count();
    
    if (existingDistricts === 0) {
      // Sample districts for major states (you can expand this list)
      const sampleDistricts = [
        // Maharashtra districts (state_id: 14)
        { district_name: 'Mumbai', state_id: 14 },
        { district_name: 'Pune', state_id: 14 },
        { district_name: 'Nagpur', state_id: 14 },
        { district_name: 'Nashik', state_id: 14 },
        { district_name: 'Aurangabad', state_id: 14 },
        
        // Karnataka districts (state_id: 11)
        { district_name: 'Bangalore Urban', state_id: 11 },
        { district_name: 'Mysore', state_id: 11 },
        { district_name: 'Mangalore', state_id: 11 },
        { district_name: 'Hubli-Dharwad', state_id: 11 },
        
        // Tamil Nadu districts (state_id: 23)
        { district_name: 'Chennai', state_id: 23 },
        { district_name: 'Coimbatore', state_id: 23 },
        { district_name: 'Madurai', state_id: 23 },
        { district_name: 'Salem', state_id: 23 },
        
        // Delhi districts (state_id: 32)
        { district_name: 'Central Delhi', state_id: 32 },
        { district_name: 'New Delhi', state_id: 32 },
        { district_name: 'North Delhi', state_id: 32 },
        { district_name: 'South Delhi', state_id: 32 }
      ];

      await District.bulkCreate(sampleDistricts);
      console.log('✅ Sample districts created successfully');
    }
  } catch (error) {
    console.error('❌ Error creating sample districts:', error.message);
  }
};

export default District;