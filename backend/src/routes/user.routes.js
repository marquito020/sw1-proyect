import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/users", UserController.getAllUsers);

router.post("/users", UserController.addUser);

router.get("/users/:id", UserController.getUser);

router.put("/users/:id", UserController.updateUser);

router.delete("/users/:id", UserController.deleteUser);

router.put("/paymentUser/:id", UserController.paymentUser);
export default router;
