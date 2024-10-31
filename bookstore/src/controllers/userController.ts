
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/userRepository';

const userRepository = new UserRepository();


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepository.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    res.status(500).json({ error: errorMessage });
  }
};
