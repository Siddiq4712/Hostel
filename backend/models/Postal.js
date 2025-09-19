// models/Postal.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import District from './District.js';

const Postal = sequelize.define('Postal', {
  postal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  district_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'District',
      key: 'district_id'
    }
  }
}, {
  tableName: 'postal',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['name', 'district_id']
    }
  ]
});

// Associations
Postal.belongsTo(District, {
  foreignKey: 'district_id',
  as: 'district'
});

District.hasMany(Postal, {
  foreignKey: 'district_id',
  as: 'postals'
});

// Static method to create sample postal areas
Postal.createSamplePostals = async () => {
  try {
    const existingPostals = await Postal.count();
    
    if (existingPostals === 0) {
      // Sample postal areas for the districts we created
      const samplePostals = [
        // Mumbai (district_id: 1)
        { name: 'Andheri East', district_id: 1 },
        { name: 'Andheri West', district_id: 1 },
        { name: 'Bandra', district_id: 1 },
        { name: 'Borivali', district_id: 1 },
        { name: 'Malad', district_id: 1 },
        { name: 'Powai', district_id: 1 },
        
        // Pune (district_id: 2)
        { name: 'Hinjewadi', district_id: 2 },
        { name: 'Kothrud', district_id: 2 },
        { name: 'Viman Nagar', district_id: 2 },
        { name: 'Wakad', district_id: 2 },
        { name: 'Baner', district_id: 2 },
        
        // Bangalore Urban (district_id: 6)
        { name: 'Whitefield', district_id: 6 },
        { name: 'Koramangala', district_id: 6 },
        { name: 'Indiranagar', district_id: 6 },
        { name: 'Electronic City', district_id: 6 },
        { name: 'Marathahalli', district_id: 6 },
        
        // Chennai (district_id: 10)
        { name: 'Anna Nagar', district_id: 10 },
        { name: 'T. Nagar', district_id: 10 },
        { name: 'Adyar', district_id: 10 },
        { name: 'Velachery', district_id: 10 },
        { name: 'OMR', district_id: 10 },
        
        // New Delhi (district_id: 15)
        { name: 'Connaught Place', district_id: 15 },
        { name: 'Karol Bagh', district_id: 15 },
        { name: 'Lajpat Nagar', district_id: 15 },
        { name: 'Greater Kailash', district_id: 15 }
      ];

      await Postal.bulkCreate(samplePostals);
      console.log('✅ Sample postal areas created successfully');
    }
  } catch (error) {
    console.error('❌ Error creating sample postal areas:', error.message);
  }
};

export default Postal;