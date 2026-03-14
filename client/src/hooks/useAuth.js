import { useUser } from "../context/UserContext"

export const useAuth = () => {

    const { token, user, auth, logout, register } = useUser()

    const isLoggedIn = !!token
    const isAdmin = user?.role === "admin"
    const isClient = user?.role === "client"

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