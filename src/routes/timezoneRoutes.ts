import { Router } from "express";
import { TimezoneController } from "../controllers/timezoneController";

const router = Router();

router.post("/convert", TimezoneController.convertTimeZone);
router.get("/list", TimezoneController.getTimeZone);

export default router;
