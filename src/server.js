import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerUsuario from './routers/usuario_routes.js'

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares
app.use(express.json())

// Rutas
app.use('/api',routerUsuario)

// Ruta no encontrada
app.use((req,res) => res.status(404).send('Endpoint no encontrado - 404'))

export default app