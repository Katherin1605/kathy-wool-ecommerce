import { createUserModel } from "../models/usersModel.js";

export const registerUser = async (req, res) => {
  try{
    const { name, email, password } = req.body
    const user = await createUserModel({ name, email, password, role: 'client' })
    return res.status(201).json( {message: 'Usuario creado correctamente', user} )
  }catch(error){
    res.status(500).json({error:'Error al crear un usuario'})
    console.error('error', error)
  }
}