import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware"; // Importando o middleware
import associacaoRoutes from "./interfaces/http/routes/associacaoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

// Rotas
app.use("/api", associacaoRoutes);

// Middleware de erro (deve ser o último)
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/eva", {
    dbName: "test",
  })
  .then(() => {
    console.log("Mongo conectado");
    console.log("📦 Models registrados:", mongoose.modelNames());
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Erro ao conectar no MongoDB", err);
  });
