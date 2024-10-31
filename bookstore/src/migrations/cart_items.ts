import pool from '../config/database';

const createCartTables = async () => {
  const client = await pool.connect();
  try {
  
    await client.query(`
      CREATE TABLE IF NOT EXISTS carts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

   
    await client.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        cart_id INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
        book_id INTEGER NOT NULL REFERENCES books(id),
        quantity INTEGER NOT NULL CHECK (quantity > 0),
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tabelas de carrinho criadas com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabelas de carrinho:', err);
  } finally {
    client.release();
  }
};

createCartTables().then(() => process.exit(0));
