import { LuArrowLeft } from 'react-icons/lu'
import { useNavigate } from 'react-router'

function Logout() {
    const navigate = useNavigate();
    return (
        <>
            <div className='h-screen flex flex-col gap-5 text-black bg-white items-center justify-center'>
                <div className='font-semibold text-2xl'>You've been logged out</div>
                <div className='flex gap-3' onClick={() => navigate("/")}><button className='btn btn-xs btn-circle'><LuArrowLeft /></button> <div className='cursor-pointer'>Back to Home</div> </div>
            </div>
        </>
    )
}

export default Logout