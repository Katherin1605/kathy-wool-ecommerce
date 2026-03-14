import {findUserbyEmailModel} from '../models/usersModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const loginUser = async (req, res) => {
  try{
    const { email, password } = req.body
  const user = await findUserbyEmailModel(email)
  if(!user){
    return res
       .status(404)
       .json({message: 'El usuario o password son incorrectas'})
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password)
  if(!isPasswordValid){
    return res.status(401).json({message: 'no autorizado'})
  }
  const token = jwt.sign({ user_id: user.user_id, email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json({ token, user: { user_id: user.user_id, name: user.name, email: user.email, role: user.role, profile_image: user.profile_image, bio: user.bio } })
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

export {loginUser}