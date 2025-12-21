import express from "express";
import config from "./config";
import initDB from "./config/db";
import { authRoutes } from "./Modules/Auth/auth.routes";
import { userRoutes } from "./Modules/Users/users.routes";

const app = express()
const port = config.port;

app.use(express.json());

initDB();

app.get('/', (req, res) => {
  res.send('Hello World from Murad!')
})

// ? customers
app.use("/api/v1/users", userRoutes);

// ? auth
app.use("/api/v1/auth", authRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
