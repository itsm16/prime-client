import { create } from "zustand";

type ToastStore = {
    toastState: boolean,
    message: string,
    setToastState : (state: {toastState: boolean, message?: string}) => void
}

const useToastStore = create<ToastStore>((set)=>({
    toastState: false,
    message: "Message",
    setToastState: (state) => set({toastState: state.toastState, message: state.message})
}))

export default useToastStore