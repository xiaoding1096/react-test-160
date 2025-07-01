import { useState } from "react";
import { createContext } from "vm";

interface IAppContext {
    user: (IUser | null);
    setUser: (v: IUser | null) => void;

}

const CurrentAppContext = createContext<IAppContext | null>(null)
type TProps = {
    children: React.ReactNode
}
export const AppProvider = (props: TProps) => {
    const [user, setUser] = useState<IUser | null>(null)
    return (
        <CurrentAppContext.Provider value={{user, setUser}}>
            {props.children}
        </CurrentAppContext.Provider>
    )
}