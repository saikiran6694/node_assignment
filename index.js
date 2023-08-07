import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import valueRoutes from "./routes/valueRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

connectDB();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", valueRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "Serevr Running Smoothly" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
