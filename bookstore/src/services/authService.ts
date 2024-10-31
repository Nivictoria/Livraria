import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/userRepository'; 
import { User } from '../models/userModel';

export class AuthService {
  private userRepository = new UserRepository(); 

  
  async registerUser(name: string, email: string, password: string): Promise<User> {
    
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error('E-mail já está em uso');
    }

    
    const passwordHash = await bcrypt.hash(password, 10); s

   
    return await this.userRepository.addUser(name, email, passwordHash);
  }

  
  async loginUser(email: string, password: string): Promise<User> {
    
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

   
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Senha incorreta');
    }

    return user; 
  }

  
}
