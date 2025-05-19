import { loadModels, sequelize } from './config/database';
import { env } from './config/env';

export async function bootstrapDatabase() {
  await loadModels();

  if (env.NODE_ENV === 'production') {
    await sequelize.sync();
    console.log('✅ DB synced (safe mode)');
  }

  await sequelize.sync({ alter: true });
  console.log(`✅ DB synced with alter for ${env.NODE_ENV}`);
}
