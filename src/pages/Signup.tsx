import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

const schema = z.object({
  name: z.string({error:"Name is required"}).min(2).max(30).nonempty(),
  email: z.email({error: "Email is required"}).nonempty(),
  password: z.string({error : "Password is required"}).nonempty()
})

function Signup() {
  const navigate = useNavigate();

  const {register, handleSubmit, formState:{errors}, reset} = useForm({resolver: zodResolver(schema)});

  async function onSubmit(data) {
    navigate("/login")
  }

  return (
    <div className="h-screen bg-white text-black flex items-center justify-center">
      <div className="flex flex-col gap-5">
      <h1 className="font-semibold text-xl">Sign Up</h1>
      <form className="flex flex-col gap-3 w-[300px]" onSubmit={handleSubmit(onSubmit)}>
        <input className="input input-primary bg-white "
          placeholder="Name"
          {...register("name")}
        />
        <p className="text-red-800 text-sm">{errors.name?.message}</p>
        <input className="input input-primary bg-white "
          placeholder="Email"
          {...register("email")}
        />
        <p className="text-red-800 text-sm">{errors.name?.message}</p>
        <input className="input input-primary bg-white"
          placeholder="Password"
          {...register("password")}
        />
        <p className="text-red-800 text-sm">{errors.name?.message}</p>
        <button className="btn" type="submit">Submit</button>
      </form>
      </div>
    </div>
  )
}

export default Signup