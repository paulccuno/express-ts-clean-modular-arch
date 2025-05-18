import express from 'express';
import 'reflect-metadata';
import './container';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './docs/swagger.json';
import { RegisterRoutes } from './routes/routes';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
RegisterRoutes(app);
// app.use('/api', individualProductsRouter);
// app.use(erroHandler)

export default app;
