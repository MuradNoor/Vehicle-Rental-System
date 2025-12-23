import { Router } from "express";
import { bookingController } from "./bookings.controller";
import auth from "../../Middleware/auth";
import { Roles } from "../Auth/auth.constant";

const router = Router();

router.post("/", auth(Roles.admin, Roles.user), bookingController.createBooking);

router.get("/", auth(Roles.admin, Roles.user), bookingController.getBookings);

router.put("/:bookingId", auth(Roles.admin, Roles.user), bookingController.updateBookings);

export const bookingRoutes = router;