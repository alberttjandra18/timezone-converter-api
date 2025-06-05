import { Router } from "express";
import { TimezoneController } from "../controllers/timezoneController";

const router = Router();

router.post("/convert", TimezoneController.convertTimeZone);

export default router;
