import { create } from "zustand";

const useAuthStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem('user'))||null,
    isLoggedIn:(!!get().user),
    login: (userData) => {
        localStorage.setItem('user',JSON.stringify(userData))
        set({user: userData, isLoggedIn: true})
    },
    loguot: () => {
        localStorage.removeItem('user')
        set({user: null, isLoggedIn: false})
    },
    isAdmin: () => {
        return get().user?.role === 'admin'
    },
    getRole: () => {
        return get().user?.role || null
    }
}))

export default useAuthStore