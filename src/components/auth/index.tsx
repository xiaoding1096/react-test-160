import { useLocation } from "react-router-dom";
import { useCurrentApp } from "../context/app.context"

type TProps = {
    children: React.ReactNode
}

const ProtectedRoute = (props: TProps) => {
    const {user, isAuthenticated} = useCurrentApp();
    const location = useLocation()
    const adminRoute = location.pathname.includes("admin")
    console.log(user)
    console.log(isAuthenticated)
    if(isAuthenticated === false) {
        return (
            <div>
                You need login to access this page 
            </div>
        )
    }
    if(isAuthenticated === true && adminRoute === true){
        const role = user?.role;
        if(role === "USER"){
            return (
                <div>
                    "You are not authorized to access this page"
                </div>
            )
        }
    }

    return(
        <>
            {props.children}
        </>
    )
}
export default ProtectedRoute