import express from "express"
import {
  getUserProfile,
  getUserOrders,
  addFavorite,
  removeFavorite
} from "../src/controllers/userController.js"



const router = express.Router()

router.get("/me", getUserProfile)

router.get("/me/orders", getUserOrders)

router.post("/me/favorites", addFavorite)

router.delete("/me/favorites/:productId", removeFavorite)

export default router