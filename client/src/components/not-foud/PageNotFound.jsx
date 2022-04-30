import React from "react";
import { Link } from "react-router-dom";

import homeStyles from "../home/css/Home.module.css"
import createStyles from "../create/css/OperationCreate.module.css"

export default function  PageNotFound(){
    return(
        <div className={homeStyles.notOperation}>
            <h1>PAGINA NO ENCONTRADA</h1>
            <h3  >La página que estás buscando no existe.
            Por favor, disculpa las molestias.</h3>
            <Link to="/" ><button className={createStyles.botonHome} >volver al home</button></Link>
        </div>
    )
}