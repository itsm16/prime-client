import {create} from 'zustand'

type ModalType = "update" | "create" | "none"

type CreateModalStore = {
    modalState: boolean,
    type: ModalType,
    clickId?: number | null,
    setModalState: ({modalState, type, clickId}: {modalState: boolean, type: ModalType, clickId?: number | null}) => void
}

const useCreateMoalStore = create<CreateModalStore>((set)=>({
    modalState: false,
    type: 'none',
    clickId: null,
    setModalState: (state) => set({modalState: state.modalState, type: state.type, clickId: state.clickId})
}))

export default useCreateMoalStore