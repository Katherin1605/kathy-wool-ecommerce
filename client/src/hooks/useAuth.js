import { useUser } from "../context/UserContext"

export const useAuth = () => {

    const { token, getProfile } = useUser()

    const user = getProfile()

    const isLoggedIn = !!token
    const isAdmin = user?.role === "Administrador"
    const isClient = user?.role === "Cliente"

    return {
        user,
        isLoggedIn,
        isAdmin,
        isClient
    }
}