import { Router } from "express";
import { checkout, fetchAllOrders } from "../src/controllers/checkoutController.js";

const router = Router();

router.post("/checkout", checkout);
router.get("/orders", fetchAllOrders);


export default router;