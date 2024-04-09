import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors";

import clientRoutes from "./routes/client-profile.routes.js";
import loginRoutes from "./routes/login.routes.js";
import fuelRoutes from "./routes/fuel-quote.routes.js"


const app = express();
const port = 3000;

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());
app.use("/client", clientRoutes);
app.use("/user", loginRoutes);
app.use("/fuelquote", fuelRoutes);



mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
  console.log("Connected to database!");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch(() => {
  console.log("Connection failed!");
});