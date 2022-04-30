import { createContext ,useContext , useEffect , useState } from "react";
import {
    createUserWithEmailAndPassword, // funcion para crear usuario de  firebase
    signInWithEmailAndPassword, // funcion autenticacion de firebase
    onAuthStateChanged, // me devueleve el estado del usuario(como un true o false)
    signOut,
} from "firebase/auth" // traigo funciones de firebase
import {auth} from "../firebase"

const authContext = createContext();

export const useAuth = () =>{ // hook personalizado para facilitar la exportacion en otros componentes
    const context  = useContext(authContext);
    if(!context ) throw new Error("algo no esta funcionanado"); // va dar un error por consola si no hay context
    return context
}

export  function AuthProvider({children}){

    const [user, setUser] = useState(null) // guardo la info del usuario con el useState() , "esto es para firebase"

    // const [dataUser , setDataUser ] = useState(null) // "prueba interna" guardo el usuario de la base de datos  en este estado

    const [loading , setLoading] = useState(true) // useState que se va usar para proteger la ruta , se utiliza en ProtectedRoute.js 

    function createUserFirebase(email, password ){ // creo el usuario en firebase
       return createUserWithEmailAndPassword(auth ,email , password ) // utilizo la funcion de firebase y la retorno
    }

    function loginFirebase(email , password){ // login con firebase
       return  signInWithEmailAndPassword(auth ,email , password )
    }

    // function login(userEmail){ //"prueba interna" en login.jsx envio el usario y lo guardo en stateData
    //     return setDataUser(userEmail)
    // }

    const logout = () => signOut(auth);

    useEffect(()=>{ // trae el usuario creado en firebase
        const exit = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser) // en el setUser guardo el currentUser
            setLoading(false) //
        });
        return () => exit();
    },[])

    return <authContext.Provider value={{
        createUserFirebase , 
        loginFirebase , 
        logout, 
        user ,
        loading,
    }} >{children}</authContext.Provider>
    
}