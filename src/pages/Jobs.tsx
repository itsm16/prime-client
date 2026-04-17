import JobCard from "../components/JobCard"
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useCreateMoalStore from '../store/createModalStore'
import { getAllJobs, getMe, logoutUser } from "../utils/query-functions";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUserStore from "../store/userStore";
import useToastStore from "../store/toastStore";
import { queryClient } from "../Providers";

function Jobs() {
    const navigate = useNavigate();
    const { setModalState } = useCreateMoalStore(state => state)
    const { setToastState } = useToastStore(state => state)
    const { user, setUserState } = useUserStore(state => state)
    const {data: jobs} = useQuery({queryKey: ["jobs"], queryFn: getAllJobs});
    const { data, isPending, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
    })
    const { mutate: logout } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            setToastState({ toastState: true, message: "Logged Out" })
            queryClient.removeQueries({ queryKey: ["user"] })
            navigate("/logout")
        },
        onSettled: () => {
            setTimeout(() => {
                setToastState({ toastState: false })
            }, 3000)
        }
    })
    const extracted = data?.data

    useEffect(() => {
        if (isError) {
            navigate("/login")
        }
        setUserState(extracted?.data)
    }, [data, isError])

    async function handleLogout() {
        logout()
    }

    if (isError) return "You're not logged in"

    return (
        <>
            <div className="h-screen bg-[#FFFFFF] text-black">
                <div className="flex justify-center">
                    <div className="h-[70px] flex justify-between w-[100%] md:w-[70%] self-center border-b border-[#D4D2D0] px-10 items-center">
                        <h1 className="text-blue-900 text-xl font-semibold cursor-pointer">Jobs</h1>
                        <div className="flex gap-3 items-center">
                            {user && user?.role?.toLowerCase() === "admin" &&
                                <button
                                    onClick={() => setModalState({ modalState: true, type: "create" })}
                                    className="btn btn-xs">Post Job +
                                </button>
                            }

                            {(user && user?.name) ?
                                <button className="btn btn-md btn-circle tooltip tooltip-bottom" data-tip={user ? user?.name : ""} ><div>{user?.name[0]}</div></button> : ""}
                            {user?.name ? <button onClick={handleLogout} className="ml-2 underline cursor-pointer">Logout</button> : ""}
                        </div>
                    </div>
                </div>
                <div style={{ height: "calc(100vh - 70px)" }} className="flex gap-2 overflow-auto justify-center py-2 px-1">
                    <div className="md:w-[70%] w-[100%] max-w-[500px] flex flex-col gap-2 scroll-auto h-max">
                        {isPending ? (
                            <p className="text-center">Loading...</p>
                        ) : jobs?.data && jobs?.data?.data.length > 0 ? (
                            jobs?.data?.data?.map((job: { id: number; role: string; company: string; location: string; description: string }) => (
                                <JobCard
                                    key={job.id}
                                    id={job.id}
                                    role={job.role}
                                    company={job.company}
                                    location={job.location}
                                    description={job.description}
                                />
                            ))
                        ) : (
                            <p className="text-center">No jobs found</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Jobs