import { Router } from "express";
import {
  criarJornadaController,
  listarJornadasController,
  buscarJornadaController,
  atualizarJornadaController,
  deletarJornadaController,
} from "../controllers/jornadaController";

const router = Router();

router.post("/", criarJornadaController);
router.get("/", listarJornadasController);
router.get("/:id", buscarJornadaController);
router.put("/:id", atualizarJornadaController);
router.delete("/:id", deletarJornadaController);

export default router;
