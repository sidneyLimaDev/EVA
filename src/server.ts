import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware";
import associacaoRoutes from "./interfaces/http/routes/associacaoRoutes";
import colaboradorRoutes from "./interfaces/http/routes/colaboradorRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Configuração manual do CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permite qualquer origem
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Cabeçalhos permitidos
  next(); // Passa para o próximo middleware ou rota
});

app.use(express.json());

// Rotas
app.use("/api/associacoes", associacaoRoutes);
app.use("/api/colaboradores", colaboradorRoutes);

// Middleware de erro
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/eva", {
    dbName: "test",
  })
  .then(() => {
    console.log("MongoDB conectado");
    console.log("📦 Models registrados:", mongoose.modelNames());
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Erro ao conectar no MongoDB", err);
  });
