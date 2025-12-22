import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../Middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehicleController.createVehicle);

router.get("/", vehicleController.getAllVehicles);

router.get("/:id", vehicleController.getSingleVehicle);

router.put("/:id", auth("admin"), vehicleController.updateVehicle);

router.delete("/:id", auth("admin"), vehicleController.deleteVehicle);

export const vehicleRoutes = router;