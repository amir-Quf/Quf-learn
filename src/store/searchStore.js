import {create} from 'zustand'
import { persist } from 'zustand/middleware'

const useSearchStore = create(persist((set) => ({
    wordSearch : '',
    setWordSearch : (word) => {
       return set({wordSearch: word})
}
})))

export default useSearchStore