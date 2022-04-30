import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export  function ProtectedRoute({children}){
    const {user , loading} = useAuth();

    if(loading){ // si loading esta en true va mostrar un h1
        return(
            <h1>Cargando...</h1> 
        )
    }

    if(!user){ // si user es null me devuelve al login
        return <Navigate to="/" />
    }
     
    return <>{children}</>
}