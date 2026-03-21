import { addReviewModel, getReviewsByProduct, getUserReview, hasUserPurchased } from '../models/reviewsModel.js'

export const addReview = async (req, res) => {
    const userId = req.user.user_id
    const productId = parseInt(req.params.id)
    const { stars } = req.body

    if (!stars || stars < 1 || stars > 5) {
        return res.status(400).json({ error: 'La calificación debe ser entre 1 y 5' })
    }

    try {
        const purchased = await hasUserPurchased(userId, productId)
        if (!purchased) {
            return res.status(403).json({ error: 'Solo puedes calificar productos que hayas comprado' })
        }

        const review = await addReviewModel(userId, productId, stars)
        res.status(201).json(review)
    } catch (error) {
        console.error('Error agregando review:', error)
        res.status(500).json({ error: 'Error interno' })
    }
}

export const fetchReviews = async (req, res) => {
    const productId = parseInt(req.params.id)
    try {
        const reviews = await getReviewsByProduct(productId)
        res.json(reviews)
    } catch (error) {
        console.error('Error obteniendo reviews:', error)
        res.status(500).json({ error: 'Error interno' })
    }
}

export const fetchUserReview = async (req, res) => {
    const userId = req.user.user_id
    const productId = parseInt(req.params.id)
    try {
        const review = await getUserReview(userId, productId)
        res.json(review || null)
    } catch (error) {
        console.error('Error obteniendo review del usuario:', error)
        res.status(500).json({ error: 'Error interno' })
    }
}