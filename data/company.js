import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const Company = sequelize.define(
  'company',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    country: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
  },
  { timestamps: false }
);

