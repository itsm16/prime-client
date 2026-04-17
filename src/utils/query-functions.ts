
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const get = (url : string) => {
    const res = axios.get(`${API_BASE_URL}${url}`, {withCredentials: true})
    return res
}

const post = (url: string, data?: object) => {
   const res = axios.post(`${API_BASE_URL}${url}`, data, {withCredentials: true})
   return res
}

const put = (url: string, data?: object) => {
    const res = axios.put(`${API_BASE_URL}${url}`, data, {withCredentials: true})
    return res
}

const deleted = (url: string) => {
    const res = axios.delete(`${API_BASE_URL}${url}`, {withCredentials: true})
    return res
}

const registerUser = ({name, email, password}: {name:string, email:string, password: string}) =>{
    const res = post("/auth/register", {name, email, password})
    return res
}

const loginUser = ({email, password}: {email: string, password: string}) => {
    const res = post("/auth/login", {email, password})
    return res
}

const logoutUser = () => {
    const res = post("/auth/logout")
    return res
}
 
const getMe = () => {
    const res = get("/auth/me")
    return res
}


// job
const createJob = (data : {role: string, company: string, location: string, description : string}) => {
    const res = post("/jobs/create", data)
    return res
}

const getAllJobs = () => {
    const res = get("/jobs/all")
    return res
}

const getJobById = (id: number) => {
    const res = get(`/jobs/${id}`)
    return res
}

const updateJobById = ({id, data}: {id: number, data: {role: string, company: string, location: string, description : string}}) => {
    const res = put(`/jobs/update/${id}`, data)
    return res
}

const deleteJobById = (id: number) => {
    const res = deleted(`/jobs/delete/${id}`)
    return res
}
 
// apply
const apply = ({id, data}: {id: number, data: {jobId: number, userId: number, resume_url: string}}) => {
    const res = post(`/jobs/apply/${id}`, data)
    return res
}

export {
    loginUser,
    registerUser,
    logoutUser,
    getMe,
    createJob,
    getAllJobs,
    getJobById,
    updateJobById,
    deleteJobById,
    apply
}