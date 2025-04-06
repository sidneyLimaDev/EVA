import { Router } from "express";
import {
  criarAcaoController,
  listarAcoesController,
  buscarAcaoController,
  atualizarAcaoController,
  deletarAcaoController,
} from "../controllers/acaoController";

const router = Router();

router.post("/", criarAcaoController);
router.get("/", listarAcoesController);
router.get("/:id", buscarAcaoController);
router.put("/:id", atualizarAcaoController);
router.delete("/:id", deletarAcaoController);

export default router;
