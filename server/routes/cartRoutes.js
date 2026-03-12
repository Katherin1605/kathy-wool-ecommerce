import { Router } from "express"
import { fetchCart, addToCart, updateCartItem, removeFromCart } from "../src/controllers/cartController.js"

const router = Router()

    router.get("/cart/:userId", fetchCart);

    router.post("/cart/add", addToCart);

    router.put("/cart/update", updateCartItem);

    router.delete("/cart/remove", removeFromCart);

export default router