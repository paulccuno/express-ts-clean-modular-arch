import app from './app';
import { bootstrapDatabase } from './bootstrap';
import { env } from './config/env';

bootstrapDatabase().then(() => {
  app.listen(env.PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${env.PORT}`);
    console.log(`📚 Swagger UI: http://localhost:${env.PORT}/api/docs`);
  });
});
