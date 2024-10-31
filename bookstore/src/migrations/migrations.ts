import { Pool } from 'pg';

const pool = new Pool; 

const createBooksTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        publication_date DATE,
        genre VARCHAR(50),
        stock INT DEFAULT 0
      );
    `;
    await client.query(queryText);
    console.log('Tabela "books" criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
  } finally {
    client.release();
  }
};

createBooksTable().then(() => process.exit(0));
