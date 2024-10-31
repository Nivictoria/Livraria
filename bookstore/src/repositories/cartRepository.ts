

import { Pool } from 'pg';
import pool from '../config/database';

export class CartRepository {
  private pool: Pool = pool;

 
  async removeItemFromCart(cartItemId: number) {
    const result = await this.pool.query(
      'DELETE FROM cart_items WHERE id = $1',
      [cartItemId]
    );
    return result.rowCount ? result.rowCount > 0 : false;
  }

  
  async clearCart(cartId: number) {
    await this.pool.query('DELETE FROM cart_items WHERE cart_id = $1', [
      cartId,
    ]);
  }
}
