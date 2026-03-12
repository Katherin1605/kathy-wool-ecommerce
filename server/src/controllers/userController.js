import * as userModel from "../models/userModel.js"

export const getUserProfile = async (req, res) => {

  try {

    const userId = req.user.id

    const user = await userModel.findUserById(userId)

    res.json(user)

  } catch (error) {

    console.error(error)

    res.status(500).json({ error: "Error obteniendo usuario" })

  }

}

export const getUserOrders = async (req, res) => {

  try {

    const userId = 1 //req.user.id. TODO: Implementar autenticación para obtener el ID del usuario logueado

    const orders = await userModel.findOrdersByUser(userId)

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

    await userModel.addFavorite(userId, productId)

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

    await userModel.removeFavorite(userId, productId)

    res.json({ message: "Favorito eliminado" })

  } catch (error) {

    console.error(error)

    res.status(500).json({ error: "Error eliminando favorito" })

  }

}