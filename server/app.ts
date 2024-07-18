import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import setupDBConnection from "./config/connection";
import userRouter from "./routers/userRouter";

dotenv.config();
setupDBConnection();

const corsUrl = process.env.CORS_ORIGIN || "https://urban-roots.space";

const app = express();

app.use(cors({ origin: corsUrl }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Backend online");
});

app.use("/users", userRouter);

app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.log("AAAAAA", err.message);
    res.status(500).json({ error: err.message });
    next();
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log("Server connected on port 5001");
});

export default app;
