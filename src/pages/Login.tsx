import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, loginUser } from "../utils/query-functions";
import useToastStore from "../store/toastStore";
import { LuLoaderCircle } from "react-icons/lu";
import useUserStore from "../store/userStore";
import { useEffect } from "react";

const schema = z.object({
    email: z.email({error: "Email is required"}).nonempty(),
    password: z.string({error : "Password is required"}).nonempty()
})

function Login() {
  const navigate = useNavigate();
  const {setToastState} = useToastStore(state => state)
  const {setUserState} = useUserStore(state =>  state)
  const {isSuccess, isPending: userPending} = useQuery({queryFn: getMe, queryKey:["user"], retry: 1})
  const {register, handleSubmit, formState:{errors}, reset} = useForm({resolver: zodResolver(schema)});

  const {mutate, isPending} = useMutation({mutationFn: loginUser,
    onError: () => {
      setToastState({toastState: true, message:"Couldn't login"})
    },
    onSuccess: ({data}) => {
      setUserState(data)
      setToastState({toastState: true, message:"Logged In"})
      reset()
      navigate("/")
    },
    onSettled: () => {
      setTimeout(()=>{
        setToastState({toastState: false})
      }, 3000)
    }
  })

  useEffect(()=>{
    if(!userPending && isSuccess){
      navigate("/")
    }
  }, [isSuccess])

  async function onSubmit(data: {email: string, password: string}) {
    const {email, password} = data;
    mutate({email, password})
  }

  return (
    <div className="h-screen bg-white text-black flex items-center justify-center">
      <div className="flex flex-col gap-5">
      <h1 className="font-semibold text-xl">Login</h1>
      <form className="flex flex-col gap-3 w-[300px]" onSubmit={handleSubmit(onSubmit)}>
        <input className="input input-primary bg-white "
          placeholder="Email"
          {...register("email")}
        />
        <p className="text-red-800 text-sm">{errors.email?.message}</p>
        <input className="input input-primary bg-white"
          placeholder="Password"
          {...register("password")}
        />
        <p className="text-red-800 text-sm">{errors.password?.message}</p>
        <button className="btn" type="submit" disabled={isPending} >Submit {isPending? <span className="text-black text-center flex items-center">loading <LuLoaderCircle className="animate-spin text-black mx-2"/></span>: ""}</button>
      </form>
      </div>
    </div>
  )
}

export default Login