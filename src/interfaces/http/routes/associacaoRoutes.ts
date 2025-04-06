import express from "express";
import {
  listarAssociacoes,
  buscarAssociacao,
  atualizarAssociacao,
  deletarAssociacao,
} from "../controllers/associacaoController";

import { associarJornadaController } from "../controllers/associarJornadaController";

const router = express.Router();

router.get("/", listarAssociacoes);
router.get("/:id", buscarAssociacao);
router.post("/", associarJornadaController);
router.put("/:id", atualizarAssociacao);
router.delete("/:id", deletarAssociacao);

export default router;
