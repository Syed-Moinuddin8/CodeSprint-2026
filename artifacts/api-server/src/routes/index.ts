import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import announcementsRouter from "./announcements";
import registrationsRouter from "./registrations";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(announcementsRouter);
router.use(registrationsRouter);
router.use(adminRouter);

export default router;
