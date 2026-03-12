import { Router } from "express"
import { fetchCartController, addToCartController, updateCartItemController, removeFromCartController } from "../src/controllers/cartController.js"

const router = Router()

//obtener carrito
    router.get("/cart/:userId", fetchCartController);

//agregar producto
    router.post("/cart/add", addToCartController);

//actualizar cantidad
    router.put("/cart/update", updateCartItemController);

//eliminar producto
    router.delete("/cart/remove", removeFromCartController);

export default router