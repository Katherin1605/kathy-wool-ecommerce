import { useMemo } from "react"
import { useCart } from "../context/CartContext"

export const useCartTotals = () => {

    const { cart } = useCart()

    const totals = useMemo(() => {

        const items = cart.reduce((acc, item) => acc + item.quantity, 0)

        const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
        )

        return {
        items,
        subtotal
        }

    }, [cart])

    return totals
}