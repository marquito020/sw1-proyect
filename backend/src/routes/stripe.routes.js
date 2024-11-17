import { Router } from "express";
import stripeController from '../controllers/stripe.controller.js'

const router = Router();

router.post("/checkout", stripeController.paymentStripe);

export default router;