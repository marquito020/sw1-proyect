import { Router } from "express";
import textToAudioController from '../controllers/textToAudio.controller.js'
const router = Router();

router.post("/textToAudio", textToAudioController.generarAudio);
router.post("/voces", textToAudioController.getVoces);
router.get("/lenguages", textToAudioController.getLanguageNames);



export default router;