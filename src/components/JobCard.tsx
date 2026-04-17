import { LiaMapMarkerAltSolid } from "react-icons/lia"
import { LuBuilding2, LuPencil, LuTrash } from "react-icons/lu"
import { useNavigate } from "react-router";
import useCreateMoalStore from "../store/createModalStore";
import useUserStore from "../store/userStore";
import { useMutation} from "@tanstack/react-query";
import { deleteJobById} from "../utils/query-functions";
import { queryClient } from "../Providers";

function JobCard({company, location, role, description, id} : {
    company: string,
    location: string,
    role:string,
    description: string,
    id: number
}) {
    const navigate = useNavigate();
    const {user} = useUserStore(state => state)
    const {setModalState} = useCreateMoalStore(state => state);
    const {mutate: deleteJob} = useMutation({mutationFn: deleteJobById, mutationKey: ["jobs"], 
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ["jobs"] })
        }
    });

    function handleApplyClick() {
        navigate(`/apply/${id}`)
    }

    const handleUpdate = () => {
        setModalState({modalState: true, type: "update", clickId: id})
    }

    const handleDelete = async () => {
        deleteJob(id)
    }
    
    return (
        <div key={id} className="border w-full h-[130px] cursor-pointer border-[#bebdbc] rounded-md p-2">
            <div className="h-[50%] flex">
                <div className="w-[70%]">
                    <h1 className=" h-[55%]">{role}</h1>
                    <div className="flex text-sm gap-5 text-zinc-600">
                        <div className="flex gap-1 items-center">
                            <LuBuilding2 />
                            <h3>{company}</h3>
                        </div>
                        <div className="flex gap-1 items-center">
                            <LiaMapMarkerAltSolid />
                            <h3>{location}</h3>
                        </div>
                    </div>
                </div>
                <div className=" w-[30%]">
                    <div className="h-[50%] flex gap-2 justify-end">
                        {(user && user?.role!.toLowerCase() !== "admin") && 
                        <button
                        onClick={handleApplyClick}
                        className="btn btn-sm">Apply</button>
                        }
                        {(user && user?.role!.toLowerCase() === "admin") && 
                        <button onClick={handleUpdate} className="btn btn-circle btn-xs"><LuPencil/></button>
                        }
                        {(user && user?.role!.toLowerCase() === "admin") && 
                        <button onClick={handleDelete} className="btn btn-circle btn-xs"><LuTrash/></button>
                        }
                    </div>
                </div>
            </div>
            <div className="h-[50%] pt-[10px] text-sm text-zinc-600">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default JobCard