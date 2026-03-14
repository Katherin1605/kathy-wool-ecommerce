import { createUserModel, findUserById, findOrdersByUser, addFavoriteModel, removeFavoriteModel, getFavoritesByUser } from "../models/usersModel.js";

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

export const getUserProfile = async (req, res) => {

  try {

    const userId = req.user.id

    const user = await findUserById(userId)

    res.json(user)

  } catch (error) {

    console.error(error)

    res.status(500).json({ error: "Error obteniendo usuario" })

  }

}

export const getUserOrders = async (req, res) => {

  try {

    const userId = req.user.id

    const orders = await findOrdersByUser(userId)

    res.json(orders)

  } catch (error) {

    console.error(error)

    res.status(500).json({ error: "Error obteniendo pedidos" })

  }

}

export const addFavorite = async (req, res) => {

  try {

    const userId = req.user.id
    const { productId } = req.body

    await addFavoriteModel(userId, productId)

    res.json({ message: "Producto agregado a favoritos" })

  } catch (error) {

    console.error(error)

    res.status(500).json({ error: "Error agregando favorito" })

  }

}

export const removeFavorite = async (req, res) => {

  try {

    const userId = req.user.id
    const { productId } = req.params

    await removeFavoriteModel(userId, productId)

    res.json({ message: "Favorito eliminado" })

  } catch (error) {

    console.error(error)

    res.status(500).json({ error: "Error eliminando favorito" })

  }

}

export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id
    const favorites = await getFavoritesByUser(userId)
    res.json(favorites)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error obteniendo favoritos" })
  }
}