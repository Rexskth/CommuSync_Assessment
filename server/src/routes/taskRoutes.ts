import { Router } from 'express';
import {
  getTasks,
  createTask,
  toggleTaskComplete,
  deleteTask,
} from '../controllers/taskController';
import { validateTaskInput, validateTaskId } from '../middleware/validate';

const router = Router();

router.get('/', getTasks);
router.post('/', validateTaskInput, createTask);
router.patch('/:id', validateTaskId, toggleTaskComplete);
router.delete('/:id', validateTaskId, deleteTask);

export default router;
