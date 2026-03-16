import { Router } from 'express'
import { registerUser, getUserProfile, getUserOrders, addFavorite, removeFavorite, getUserFavorites, updateUserAvatar, updateUser } from '../src/controllers/usersController.js'
import { verifyToken } from '../middleware/verifyToken.middleware.js'

const router = Router()

router.post('/', registerUser)
router.get("/me", verifyToken, getUserProfile)
router.get("/me/orders", verifyToken, getUserOrders)
router.get("/me/favorites", verifyToken, getUserFavorites)
router.post("/me/favorites", verifyToken, addFavorite)
router.delete("/me/favorites/:productId", verifyToken, removeFavorite)
router.put("/me/avatar", verifyToken, updateUserAvatar)
router.put("/me", verifyToken, updateUser)

export default router
