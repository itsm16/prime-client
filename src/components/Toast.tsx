import useToastStore from "../store/toastStore"


export default function Toast() {
    const { toastState, message } = useToastStore(state => state)

    return (
        <div className={`${toastState ? "toast" : ""} toast-top toast-end`}>
            <div className="alert alert-dash">
                <span className="text-black">{message}</span>
            </div>
        </div>
    )
}
