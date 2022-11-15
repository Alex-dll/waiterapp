import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function createProducts(req: Request, res: Response) {
  try {
    const errors: Array<string> = [];
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    console.log(ingredients);

    if (!imagePath) {
      errors.push('image is required');
    }

    if (!name) {
      errors.push('name is required');
    }

    if (!description) {
      errors.push('description is required');
    }

    if (!price) {
      errors.push('price is required');
    }

    if (!category) {
      errors.push('category is required');
    }


    if (errors.length > 0) {
      return res.status(400).json({
        error: `Verify fields: ${errors.join()}`
      });
    }

    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
