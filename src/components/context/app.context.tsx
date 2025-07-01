import { createContext, useContext, useState } from "react";

interface IAppContext {
    user: (IUser | null);
    setUser: (v: IUser | null) => void;
    isLoading: boolean;
    setIsLoading: (v: boolean) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null)

type TProps = {
    children: React.ReactNode
}

export const AppProvider = (props: TProps) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    return (
        <CurrentAppContext.Provider value={{user, setUser, isLoading, setIsLoading,isAuthenticated, setIsAuthenticated}}>
            {props.children}
        </CurrentAppContext.Provider>
    )
}

export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext)
    if(!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentAppContext.Provider>"
        )
    }
    return currentAppContext;
}