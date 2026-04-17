import { create } from "zustand";

export type User = {
    id: number,
    name: string,
    email: string,
    role?: string
}

type UserStore = {
    user: null | User,
    setUserState : (state : User) => void
}

const useUserStore = create<UserStore>((set)=>({
    user: null,
    setUserState: (state) => set({user: state})
}))

export default useUserStore