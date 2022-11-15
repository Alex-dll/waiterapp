import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const errors: Array<string> = [];
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      errors.push('Status should be one of these: WAITING, IN_PRODUCTION, DONE.');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: `Verify fields: ${errors.join()}`
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

