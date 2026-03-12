import {Router} from 'express'
import { registerUser } from '../src/controllers/usersController.js'

const router = Router()

router.post('/', registerUser)

export default router
