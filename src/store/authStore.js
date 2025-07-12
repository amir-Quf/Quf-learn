import { create } from "zustand";

const useAuthStore = create((set, get) => ({
    hiddenPassword : true,
    confirmHiddenPassword: true,
    user: JSON.parse(localStorage.getItem('user'))||null,
    isLoggedIn:(!!localStorage.getItem('user')),
    login: (userData) => {
        localStorage.setItem('user',JSON.stringify(userData))
        set({user: userData, isLoggedIn: true})
    },
    logout: () => {
        localStorage.removeItem('user')
        set({user: null, isLoggedIn: false})
    },
    isAdmin: () => {
        const user = JSON.parse(localStorage.getItem('user'))
        return (user?.role === 'admin')
    },
    getRole: () => {
        const user = JSON.parse(localStorage.getItem('user'))
        return (user?.role || null)
    },
    changeHiddenPassword: () => {
        const toggle = !(get().hiddenPassword)
        set({hiddenPassword : toggle})
    },
    changeConfirmHiddenPassword: () => {
        const toggle = !(get().confirmHiddenPassword)
        set({confirmHiddenPassword : toggle})
    },
    updateData: (userData) => {
        localStorage.setItem('user', JSON.stringify(userData))
        set({user : JSON.parse(localStorage.getItem('user'))})
    }
}))

export default useAuthStore