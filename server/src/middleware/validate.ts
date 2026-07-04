import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateTaskInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, description } = req.body;
  const errors: string[] = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.trim().length > 100) {
    errors.push('Title cannot exceed 100 characters');
  }

  if (description !== undefined && description !== null) {
    if (typeof description !== 'string') {
      errors.push('Description must be a string');
    } else if (description.length > 500) {
      errors.push('Description cannot exceed 500 characters');
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ success: false, error: errors.join(', ') });
    return;
  }

  req.body.title = title.trim();
  if (description) {
    req.body.description = description.trim();
  }

  next();
};

export const validateTaskId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, error: 'Invalid task ID format' });
    return;
  }

  next();
};
