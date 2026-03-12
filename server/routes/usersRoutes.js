import {Router} from 'express'
import { registerUser, getUserProfile, getUserOrders, addFavorite, removeFavorite } from '../src/controllers/usersController.js'

const router = Router()

router.post('/', registerUser)
router.get("/me", getUserProfile)
router.get("/me/orders", getUserOrders)
router.post("/me/favorites", addFavorite)
router.delete("/me/favorites/:productId", removeFavorite)

export default router
