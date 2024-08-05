import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { Company } from './company.js';

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Job = sequelize.define('job', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  position: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  reward: {
    type: DataTypes.INTEGER,
  },
  position_detail: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  skills: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});
Job.belongsTo(Company);

const INCLUDE_COMPANY = {
  attributes: [
    'id',
    'position',
    'reward',
    'skills',
    'companyId',
    [Sequelize.col('company.name'), 'company'],
    [Sequelize.col('company.country'), 'country'],
    [Sequelize.col('company.city'), 'city'],
  ],
  include: {
    model: Company,
    attributes: [],
  },
};

const INCLUDE_DETAIL = {
  attributes: [
    'id',
    'position',
    'reward',
    'skills',
    'position_detail',
    'companyId',
    [Sequelize.col('company.name'), 'company'],
    [Sequelize.col('company.country'), 'country'],
    [Sequelize.col('company.city'), 'city'],
  ],
  include: {
    model: Company,
    attributes: [],
  },
};

const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
};

export async function getAll() {
  return Job.findAll({ ...INCLUDE_COMPANY, ...ORDER_DESC });
}

export async function getAllBySearch(query) {
  return Job.findAll({
    ...INCLUDE_COMPANY,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_COMPANY.include,
      where: {
        $or: [
          { 'position': { like: '%' + query + '%' } },
          { 'skills': { like: '%' + query + '%' } },
          { '$company.name$': { like: '%' + query + '%' } }
        ]
      },
    },
  });
}

export async function getById(id) {
  return Job.findOne({
    where: { id },
    ...INCLUDE_DETAIL,
  });
}

export async function create(companyId, position, reward, position_detail, skills) {
  return Job.create({ companyId, position, reward, position_detail, skills }) //
    .then((data) => this.getById(data.dataValues.id));
}

export async function update(id, position, reward, position_detail, skills) {
  return Job.findByPk(id, INCLUDE_COMPANY) //
    .then((job) => {
      job.position = position;
      job.reward = reward;
      job.position_detail = position_detail;
      job.skills = skills;
      return job.save();
    });
}

export async function remove(id) {
  return Job.findByPk(id) //
    .then((job) => {
      job.destroy();
    });
}
