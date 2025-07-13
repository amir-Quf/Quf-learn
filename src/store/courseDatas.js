import { create } from "zustand";
import fetchApi from "./server";
import { persist } from 'zustand/middleware'
const useCourseStore = create(persist((set, get) => ({
    courses: [],
    loading: false,
    error: null,
    fetchCourses: async () => {
        set({loading: true})
        try{
            const res = await fetchApi.get('/coursesList')
            set({courses: res.data, loading: false})
        } catch (err){
            set({error: err.message, loading: false})
        }
    },
    getCourseById: (id) => {
        const courses = get().courses || []
        return courses.find((course) => course.id === id)

    },
    
})))

export default useCourseStore