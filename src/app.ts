import express from "express";
import timezoneRoutes from "./routes/timezoneRoutes";

const app = express();

app.use(express.json());
app.use("/api/timezone", timezoneRoutes);

export default app;
