import { Outlet } from "react-router-dom"
import AppHeader from "components/layout/app.header"
import { useEffect } from "react"
import { fetchAccountApi } from "services/api"
import { useCurrentApp } from "./components/context/app.context"
import { BarLoader } from "react-spinners"




function Layout() {
  const {setUser,isLoading, setIsLoading, setIsAuthenticated} = useCurrentApp();
  
  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountApi()
      if(res.data){
        console.log(res.data)
        setUser(res.data.user)
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }
    fetchAccount();
  },[])

  return (
    <>
    {isLoading ? 
      <div style={{
          position:"fixed",
          top:"50%",
          left:"50%",
          transform:"translate(-50%, -50%)"
         }}>
        <BarLoader/>
      </div>
    :
      <div>
        <AppHeader/>
        <Outlet/>
      </div>
      }
    </>
  )
}

export default Layout
