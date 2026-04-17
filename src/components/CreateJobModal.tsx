import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateMoalStore from '../store/createModalStore';
import { useMutation, useQuery } from "@tanstack/react-query";
import { createJob, getJobById, updateJobById } from "../utils/query-functions";
import { useEffect } from "react";
import { queryClient } from "../Providers";
import useToastStore from "../store/toastStore";

const jobSchema = z.object({
  role: z.string().min(5, "Role Required"),
  company: z.string().min(5, "Company Required"),
  location: z.string().min(5, "Location Required"),
  description: z.string().min(5, "Description Required")
})

function CreateModal() {
  const { modalState, setModalState, type, clickId } = useCreateMoalStore()
  const { setToastState } = useToastStore(state => state)
  const { mutate: create } = useMutation({
    mutationFn: createJob, mutationKey: ["jobs"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      setToastState({toastState: true, message: "Job created successfully"})
      setModalState({ modalState: false, type: "none" })
      reset()
    },
    onSettled: ()=>{
      setTimeout(()=>{
        setToastState({toastState: false})
      },3000)
    }
  })
  const { data: updateData } = useQuery({ queryFn: () => getJobById(Number(clickId)), queryKey: ["job"],
    enabled: type === "update" && Number.isFinite(clickId),
   })
  const { mutate: update } = useMutation({
    mutationFn: updateJobById, mutationKey: ["jobs"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      setModalState({ modalState: false, type: "none" })
      reset()
    }
  })
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(jobSchema) });

  useEffect(() => {
    if (!updateData) return

    reset({
      role: updateData?.data?.data?.role ?? "",
      company: updateData?.data?.data?.company ?? "",
      location: updateData?.data?.data?.location ?? "",
      description: updateData?.data?.data?.description ?? ""
    })
  }, [updateData, reset])

  async function onSubmit(data: z.infer<typeof jobSchema>) {
    if (type === "create") {
      create(data)
    }

    if (type === "update") {
      if (!clickId) return
      update({ id: clickId as number, data })
    }
  }

  const closeModal = () => {
    setModalState({ modalState: false, type: "none" })
    reset()
  }

  return (
    <dialog className={`modal ${modalState ? 'modal-open' : ''}`}>
      <div className="modal-box bg-white">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={closeModal} className="btn btn-xs btn-circle btn-ghost text-black hover:text-white  absolute right-2 top-2 ">✕</button>
        </form>
        <div className=' mt-5 flex flex-col items-center'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <input
              {...register("role")}
              placeholder='Role'
              className='input bg-white input-primary text-black' />
            {errors.role && <p className='text-red-800'>{errors.role.message}</p>}
            <input
              {...register("company")}
              placeholder='Company'
              className='input bg-white input-primary text-black' />
            {errors.company && <p className='text-red-800'>{errors.company.message}</p>}
            <input
              {...register("location")}
              placeholder='Location'
              className='input bg-white input-primary text-black' />
            {errors.location && <p className='text-red-800'>{errors.location.message}</p>}
            <textarea
              {...register("description")}
              placeholder='Description'
              className='textarea bg-white input-primary text-black' />
            {errors.description && <p className='text-red-800'>{errors.description.message}</p>}
            <button
              className='btn mt-5 btn-outline bg-black rounded-md'
              type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default CreateModal