import express from 'express';
import userRoutes from './routes/userRoutes'; 
import authRoutes from './routes/authRoutes'; 

const app = express();


app.use(express.json());


app.use('/auth', authRoutes); 


app.use('/api', userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
