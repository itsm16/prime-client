import { LiaMapMarkerAltSolid } from "react-icons/lia"
import { LuArrowLeft, LuBuilding2 } from "react-icons/lu"
import { useNavigate, useParams} from "react-router"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { apply, getJobById } from "../utils/query-functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUserStore from "../store/userStore";
import useToastStore from "../store/toastStore";
const applicationSchema = z.object({
    applicant: z.string().nonoptional(),
    email: z.email().nonoptional(),
    resume_url: z.url().nonoptional()
})

function JobPage() {
    const navigate = useNavigate();
    const params = useParams();
    const { user } = useUserStore(state => state)
    const {setToastState} = useToastStore(state => state)
    const id = Number(params.jobId)
    const {mutate} = useMutation({mutationFn: apply, mutationKey: ["apply"],
        onError: () => {
            setToastState({
                toastState: true,
                message: "Failed to submit application"
            })
        },
        onSuccess: ()=>{
            setToastState({
                toastState: true,
                message: "Application submitted successfully"
            })
        },
        onSettled: ()=>{
            setTimeout(()=>{
                setToastState({
                    toastState: false,
                    message: ""
                })
            }, 3000)
        }
    })

    const { data, isPending } = useQuery({ 
    queryKey: ["job"],
    queryFn: () => getJobById(id),
    })
    const jobData = data?.data

    useEffect(() => {
        if(user){
            reset({
                applicant: user.name,
                email: user.email,
                resume_url: ""
            })
        }
    }, [user])

    if(!isPending && !data){
        navigate("/not-found")
    }

    const {register, handleSubmit, reset, formState:{errors}} = useForm({resolver: zodResolver(applicationSchema)})

    async function onSubmit(data: z.infer<typeof applicationSchema>){
        mutate({id, data: {userId: user?.id!, jobId: Number(params.jobId) , resume_url: data.resume_url}})
    }

    return (
        <div className="bg-white h-screen text-black flex items-center justify-center">
            <div className="">
                <button 
                onClick={()=>navigate("/")}
                className="mb-3 btn btn-xs btn-circle"><LuArrowLeft size={17}/></button>
                <div className="border w-full h-[130px] cursor-pointer border-[#bebdbc] rounded-md p-2">
                    <div className="h-[50%] flex">
                        <div className="w-[70%] min-w-[500px]">
                            <h1 className=" h-[55%]">{jobData?.data?.role}</h1>
                            <div className="flex text-sm gap-5 text-zinc-600">
                                <div className="flex gap-1 items-center">
                                    <LuBuilding2 />
                                    <h3>{jobData?.data?.company}</h3>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <LiaMapMarkerAltSolid />
                                    <h3>{jobData?.data?.company}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[50%] pt-[10px] text-sm text-zinc-600">
                        <p>{jobData?.data?.description}</p>
                    </div>
                </div>
                <div className=' mt-5 flex flex-col items-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                        <input
                            {...register("applicant")}
                            placeholder='Applicant'
                            className='input bg-white input-primary text-black' />
                            {errors.applicant && <p className='text-red-500'>{errors.applicant.message}</p>}
                        <input
                            {...register("email")}
                            placeholder='Email'
                            className='input bg-white input-primary text-black' />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        <input
                            {...register("resume_url")}
                            placeholder='Resume URL'
                            className='input bg-white input-primary text-black' />
                        <button
                            className='btn mt-5 btn-outline text-white bg-black rounded-md'
                            type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JobPage