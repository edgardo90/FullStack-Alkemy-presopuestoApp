import React from "react";
import { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postUser } from "../../actions";
import { useAuth } from "../AuthProvider";
import { getUsers } from "../../actions";

import stylesCreate from "../create/css/OperationCreate.module.css"


const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i ;
const regexLetter = /[A-Z]+$/i ;

function validate(input){
    const errors = {};
    if(!input.email ){
        errors.email = "ingresa tu email"
    }else if( !regexEmail.test(input.email) ){
        errors.email = "el formato de email es incorrecto " ;
    }
    if(!input.name){
        errors.name = "ingresa tu nombre"
    }else if(!regexLetter.test(input.name) ){
        errors.name = "solo tiene que ser letras y sin espacios" ;
    }
    if(!input.lastName){
        errors.lastName = "ingresa tu apellido"
    }else if(!regexLetter.test(input.lastName) ){
        errors.lastName = "solo tiene que ser letras y sin espacios" ;
    }
    if(!input.password){
        errors.password = "ingrese password" ;
    }else if(input.password.length < 6 || input.password.length > 12 ){
        errors.password = "la contraseña debe contener entre 6 y 12 caracteres" ;
    }
    return errors ;
}

export default function Register(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {createUserFirebase} = useAuth()
    const allUsers = useSelector(state => state.users);

    useEffect(()=>{
        dispatch(getUsers());
    },[dispatch]);
    // console.log(allUsers);

    const  [user , setUser ] = useState({
        email: "",
        name:"",
        lastName:"",
        password:"",
    });
    const [errors , setErrors ] = useState({});



    function handleChange(event){
        setUser(({
            ...user,
            [event.target.name] : event.target.value,
        }));
        // console.log(user)
        setErrors(validate({
            ...user,
            [event.target.name] : event.target.value
        }));
    };

    const existsUser = user.email && allUsers.find(el => el.email === user.email );
    console.log(existsUser)

    function handleSubmit(event){
        event.preventDefault();
        if(!user.name || !user.lastName ){
            return alert("por favor completa la informacion");
        }
        if(Object.values(errors).length > 0 ){
            return alert("observa los errores que esta en color rojo");
        }
        if(existsUser){
            return alert("ya hay un usuario con email")
        }
        createUserFirebase(user.email , user.password) // creo el usuario para que se guarde en firebase
        dispatch(postUser(user));
        alert("usuario creado con exito")
        setUser({
            email:"",
            name:"",
            lastName:"",
            password:"",
        });
        navigate("/")
    }

    return(
        <div>
            <Link to="/" ><button className={stylesCreate.botonHome} >Iniciar sesion</button> </Link>
            <h1 className={stylesCreate.titulo}>Crea tu usuario</h1>
            <div className={stylesCreate.box} >

            <form className={stylesCreate.formulario} onSubmit={event => handleSubmit(event) } >
                <div>
                    <label >Ingresa email: </label>
                    <input
                     type="email"
                     name="email"
                     style={{width : "190px", heigth : "1px"}}
                     value={user.email}
                     onChange = {event => handleChange(event)}
                     />
                </div>
                {errors.email && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.email}</p>
                    }
                <br />
                <div>
                    <label >Ingresa tu nombre: </label>
                    <input
                     type="text"
                     name="name"
                     value={user.name}
                     onChange = {event => handleChange(event)}
                     />
                </div>
                {errors.name && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.name}</p>
                    }
                <br />
                <div>
                    <label >Ingrese tu apellido : </label>
                    <input
                     type="text"
                     name="lastName"
                     value={user.lastName}
                     onChange = {event => handleChange(event)}
                     />
                </div>
                {errors.lastName && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.lastName}</p>
                    }
                <br />
                <div>
                    <label >Ingrese contraseña: </label>
                    <input
                     type="password"
                     name="password"
                     value={user.password}
                     onChange = {event => handleChange(event)}
                     />
                </div>
                {errors.password && 
                     <p  style={{color: "red" , fontWeight: 700 , fontSize: 14}}  >{errors.password}</p>
                    }
                <br />
                <button className={ stylesCreate.btnCreate} style={{marginLeft: "30%"}}  type="submit" >
                    Crear usuario
                </button>
            </form>
            </div>

        </div>
    )

}