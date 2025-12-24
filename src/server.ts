import express from "express";
import config from "./config";
import initDB from "./config/db";
import { authRoutes } from "./Modules/Auth/auth.routes";
import { userRoutes } from "./Modules/Users/users.routes";
import { vehicleRoutes } from "./Modules/Vehicles/vehicles.routes";
import { bookingRoutes } from "./Modules/Bookings/bookings.routes";

const app = express()
const port = config.port;

app.use(express.json());

//* Database initialized 
initDB();

// ? customers
app.use("/api/v1/users", userRoutes);

// ? auth
app.use("/api/v1/auth", authRoutes);

// ? vehicles
app.use("/api/v1/vehicles", vehicleRoutes);

// ? bookings
app.use("/api/v1/bookings", bookingRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
