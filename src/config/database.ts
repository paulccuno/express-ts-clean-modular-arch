import { Sequelize } from 'sequelize-typescript';
import { env } from './env';
import { readdirSync } from 'fs';
import path from 'path';

export const sequelize = new Sequelize(env.DB_URL, {
  dialect: 'postgres',
  logging: env.NODE_ENV !== 'production',
});

const modelFiles = readdirSync(path.join(__dirname, '../models'))
  .filter((file) => file.endsWith('.model.ts') || file.endsWith('.model.js'))
  .map((file) => require(`../models/${file}`).default);

sequelize.addModels(modelFiles);
