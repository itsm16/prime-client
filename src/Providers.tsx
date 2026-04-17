import { BrowserRouter } from "react-router"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


export const queryClient = new QueryClient()

function Providers({children}: {children: React.ReactNode}) {

  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
    </BrowserRouter>
  )
}

export default Providers