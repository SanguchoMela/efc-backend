import { Schema, model } from "mongoose"
import bcrypt from 'bcrypt'

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
})

usuarioSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncrypt = await bcrypt.hash(password,salt)
    return passwordEncrypt
}

usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

export default model('Usuario',usuarioSchema)