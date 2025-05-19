import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationError as ClassValidationError } from 'class-validator';
import { ValidationError as SequelizeValidationError } from 'sequelize';

const isObject = (val: unknown): val is Record<string, any> =>
  typeof val === 'object' && val !== null;

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('❌ Error atrapado:', err);

  // Sequelize
  if (err instanceof SequelizeValidationError) {
    res.status(400).json({
      message: 'Error de validación de base de datos',
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
    return;
  }

  // TSOA
  if (
    isObject(err) &&
    'fields' in err &&
    'status' in err &&
    (err as any).status === 422
  ) {
    res.status(422).json({
      message: 'Error de validación en los datos enviados',
      errors: (err as any).fields,
    });
    return;
  }

  // Custom errors con status y message
  if (isObject(err) && 'status' in err && 'message' in err) {
    res.status((err as any).status).json({
      message: (err as any).message,
      ...((err as any).details && { details: (err as any).details }),
    });
    return;
  }

  // Error estándar
  if (err instanceof Error) {
    res.status(500).json({
      message: err.message || 'Error inesperado',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
    return;
  }

  // Fallback genérico
  res.status(500).json({
    message: 'Error interno del servidor',
  });
  return;
};
