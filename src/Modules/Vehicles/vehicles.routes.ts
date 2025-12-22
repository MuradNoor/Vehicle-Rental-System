import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../Middleware/auth";
import { Roles } from "../Auth/auth.constant";

const router = Router();

router.post("/", auth(Roles.admin), vehicleController.createVehicle);

router.get("/", vehicleController.getAllVehicles);

router.get("/:id", vehicleController.getSingleVehicle);

router.put("/:id", auth(Roles.admin), vehicleController.updateVehicle);

router.delete("/:id", auth(Roles.admin), vehicleController.deleteVehicle);

export const vehicleRoutes = router;