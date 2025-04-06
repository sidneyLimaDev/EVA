// src/interfaces/http/routes/colaboradorRoutes.ts

import { Router } from "express";
import {
  criarColaboradorController,
  buscarColaboradorPorIdController,
  atualizarColaboradorController,
  deletarColaboradorController,
  listarColaboradoresController,
} from "../controllers/colaboradorController";

const router = Router();

// Rotas para Colaborador
router.post("/", criarColaboradorController);
router.get("/", listarColaboradoresController);
router.get("/:id", buscarColaboradorPorIdController);
router.put("/:id", atualizarColaboradorController);
router.delete("/:id", deletarColaboradorController);

export default router;
