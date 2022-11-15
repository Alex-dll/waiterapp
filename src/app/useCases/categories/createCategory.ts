import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
  try {
    const errors: Array<string> = [];
    const { icon, name } = req.body;

    if (!icon) {
      errors.push('Icon is required');
    }

    if (!name) {
      errors.push('Name is required');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: `Verify fields: ${errors.join()}`
      });
    }

    const category = await Category.create({ icon, name });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

