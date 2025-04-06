// src/interfaces/http/routes/jornadaRoutes.ts
import { Router } from "express";
import { criarJornadaController } from "../controllers/criarJornadaController";

const jornadaRoutes = Router();

jornadaRoutes.post("/", criarJornadaController);

export default jornadaRoutes;
