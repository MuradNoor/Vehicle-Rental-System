import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../Middleware/auth";
import { Roles } from "../Auth/auth.constant";

const router = Router();

router.get("/", auth(Roles.admin), userController.getUsers);

router.put("/:id", auth(Roles.admin, Roles.user), userController.updateUser);

router.delete("/:id", auth(Roles.admin), userController.deleteUser);

export const userRoutes = router;