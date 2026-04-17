import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Jobs from "./pages/Jobs"
import JobPage from "./pages/JobPage"
import NotFound from "./pages/NotFound"
import Logout from "./pages/Logout"
import CreateModal from "./components/CreateJobModal"
import Toast from "./components/Toast"
import { useQuery } from "@tanstack/react-query"
import { getMe } from "./utils/query-functions"
import { useEffect } from "react"
import useUserStore from "./store/userStore"

function App() {
  const { setUserState } = useUserStore(state => state)

  const { data, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: 1,
  })

  const extracted = data?.data

  useEffect(() => {
    if(isError) return

    if(data){
    setUserState(extracted?.data)
    }
  }, [data, isError])

  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Jobs />} />
        <Route path="/apply/:jobId" element={<JobPage />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
      <CreateModal />
      <Toast />
    </>
  )
}

export default App