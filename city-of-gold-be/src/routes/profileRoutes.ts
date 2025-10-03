import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticate, getProfile);
router.put("/", authenticate, updateProfile);

export default router;
