import { Request, Response } from 'express';
import { getAllBooks, addBook } from '../controllers/bookController';
import { BookRepository } from '../repositories/bookRepository';

jest.mock('../repositories/bookRepository');

describe('BookController', () => {
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('getAllBooks deve retornar todos os livros', async () => {
    const books = [{ id: 1, title: 'Livro A', author: 'Autor A', price: 10 }];
    (BookRepository.prototype.getAllBooks as jest.Mock).mockResolvedValue(books);

    await getAllBooks(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(books);
  });

  test('addBook deve validar o título e retornar erro se inválido', async () => {
    mockRequest = { body: { title: 'AB', author: 'Autor', price: 20 } };

    await addBook(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'O título deve ter pelo menos 3 caracteres.' });
  });

  test('addBook deve adicionar livro se o título for válido', async () => {
    const book = { id: 1, title: 'Livro Válido', author: 'Autor', price: 20 };
    (BookRepository.prototype.addBook as jest.Mock).mockResolvedValue(book);

    mockRequest = { body: { title: 'Livro Válido', author: 'Autor', price: 20 } };

    await addBook(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(book);
  });
});
