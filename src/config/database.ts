import { Sequelize } from 'sequelize-typescript';
import { env } from './env';
import { readdirSync } from 'fs';
import path from 'path';

export const sequelize = new Sequelize(env.DB_URL, {
  dialect: 'postgres',
  logging: env.NODE_ENV !== 'production',
});

export async function loadModels() {
  const modelDir = path.join(__dirname, '../models');

  const modelFiles = readdirSync(modelDir).filter(
    (file) => file.endsWith('.model.ts') || file.endsWith('.model.js')
  );

  const models = modelFiles.map((file) => {
    const module = require(path.join(modelDir, file));
    return module.default ?? Object.values(module)[0];
  });

  console.log(
    '✅ Modelos cargados:',
    models.map((m) => m.name)
  );
  sequelize.addModels(models);
}
