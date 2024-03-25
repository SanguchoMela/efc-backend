import { Router } from "express"
import {
    loginUsuario,
    registro
} from '../controllers/usuario_controller.js'

const router = Router()

router.post('/login',loginUsuario)
router.post('/registro',registro)

export default router