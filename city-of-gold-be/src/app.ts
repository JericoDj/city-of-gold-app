import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4000',
    'http://localhost:5000',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("okay");
});
 
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

export default app;
