import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err.message);

  if (err.code === 11000) {
    res.status(400).json({ success: false, error: 'Duplicate field value' });
    return;
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {})
      .map((val: any) => val.message)
      .join(', ');
    res.status(400).json({ success: false, error: message });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({ success: false, error: 'Invalid ID format' });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal server error';

  res.status(statusCode).json({ success: false, error: message });
};
