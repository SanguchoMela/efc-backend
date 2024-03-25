import mongoose from "mongoose"
import generarJWT from "../helpers/crearJWT.js"
import Usuario from "../models/Usuario.js"

const loginUsuario = async(req,res) => {
    const {email,password} = req.body
    if(Object.values(req.body).includes(' ')) return res.status(400).json({msg:'Debe llenar todos los campos'})
    const usuarioBDD = await Usuario.findOne({email}).select('-_V')
    if (!usuarioBDD) return res.status(404).json({msg:'Usuario no registrado'})
    const verificarPassword = await usuarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:'Password incorrecto'})

    const token = generarJWT(usuarioBDD._id)

    const {nombre,apellido,_id} = usuarioBDD
    res.status(200).json({
        _id,
        token,
        nombre,
        apellido,
        email: usuarioBDD.email
    })
}

// No necesario
const registro = async(req,res) => {
    const {email,password} = req.body
    if (Object.values(req.body).includes(" ")) return res.status(400).json({msg:"Debes llenar todos los campos"})
    const verificarEmailBDD = await Usuario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"El email ya se encuentra registrado"})
    const nuevoUsuario = new Usuario(req.body)
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password)
    await nuevoUsuario.save()
    res.status(200).json({nuevoUsuario})
}

export {
    loginUsuario,
    registro
}