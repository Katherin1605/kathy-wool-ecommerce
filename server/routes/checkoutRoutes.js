import { Router } from "express";
import { checkout } from "../src/controllers/checkoutController.js";

const router = Router();

router.post("/checkout", checkout);

export default router;