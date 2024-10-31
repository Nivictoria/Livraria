import { Request, Response } from 'express';
import { BookRepository } from '../repositories/bookRepository';

const bookRepository = new BookRepository();

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await bookRepository.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    res.status(500).json({ error: errorMessage });
  }
};

export const addBook = async (req: Request, res: Response): Promise<void> => {
  const { title, author, price } = req.body;
  try {
    const newBook = await bookRepository.addBook(title, author, price);
    res.status(201).json(newBook);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    res.status(400).json({ error: errorMessage });
  }
};
