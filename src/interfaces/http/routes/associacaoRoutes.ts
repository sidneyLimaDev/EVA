import { Router } from "express";
import { associarJornadaController } from "../controllers/associarJornadaController";

const router = Router();

router.post("/associacoes", associarJornadaController);

export default router;
