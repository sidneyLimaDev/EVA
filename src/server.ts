import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import associacaoRoutes from "./interfaces/http/routes/associacaoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use("/api", associacaoRoutes);

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
