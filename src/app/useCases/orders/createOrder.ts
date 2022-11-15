import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
  try {
    const errors: Array<string> = [];
    const { table, products } = req.body;

    if (!table) {
      errors.push('Icon is required');
    }

    if (!products) {
      errors.push('product is required');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: `Verify fields: ${errors.join()}`
      });
    }

    const order = await Order.create({ table, products });

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

