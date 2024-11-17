import { Router } from "express";
import TextIAController from '../controllers/textIA.controller.js'


const router = Router();

router.post("/generarTexto", TextIAController.generarTexto);
router.get("/getTexto/:id", TextIAController.getTexto);
router.get("/getTextoUser/:idUser", TextIAController.getTextoUser);
router.get("/getTextos", TextIAController.getTextos);
router.post("/texto/actualizar", TextIAController.actualizarTexto);

export default router;