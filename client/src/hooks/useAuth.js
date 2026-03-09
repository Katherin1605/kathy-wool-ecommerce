import { useUser } from "../context/UserContext"

export const useAuth = () => {

    const { token, user, auth, logout, register } = useUser()

    const isLoggedIn = !!token
    const isAdmin = user?.role === "Administrador"
    const isClient = user?.role === "Cliente"

    return {
        user,
        auth,
        logout,
        register,
        isLoggedIn,
        isAdmin,
        isClient
    }
}