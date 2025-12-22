import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../Middleware/auth";

const router = Router();

router.get("/", auth("admin"), userController.getUsers);

router.put("/:id", userController.updateUser);

router.delete("/:id", auth("admin"), userController.deleteUser);

export const userRoutes = router;