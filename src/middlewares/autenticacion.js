import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario'

const verificarAutenticacion = async (req,res,next) => {
    if(!req.headers.authorization) return res.status(404).json({msg:'Debes proporcionar un token'})
    const {authorization} = req.headers
    try {
        const {id} = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
        req.usuarioBDD = await Usuario.findById(id).lean().select('-password')
        next()
    } catch (error) {
        const e = new Error('Formato de token no válido')
        return res.status(404).json({msg:e.message})
    }
}

export default verificarAutenticacion