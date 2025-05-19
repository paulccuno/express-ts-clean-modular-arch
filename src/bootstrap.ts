import { loadModels, sequelize } from './config/database';
import { env } from './config/env';

export async function bootstrapDatabase() {
  await loadModels();

  if (env.NODE_ENV === 'production') {
    await sequelize.sync();
    console.log('✅ DB sincronizado (modo seguro)');
  }

  await sequelize.sync({ alter: true });
  console.log(`✅ DB sincronizada con alter para ${env.NODE_ENV}`);
}
