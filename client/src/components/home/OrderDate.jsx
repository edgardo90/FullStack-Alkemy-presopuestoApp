import React from "react";
import { useDispatch } from "react-redux";
import { orderByDate } from "../../actions";

import styles from "./css/Filtrado.module.css"

export default function OrderDate({setCurrentPage, setOrder}){
    const dispatch = useDispatch();

    function handleSortDate(event){  
        event.preventDefault();  
        dispatch(orderByDate(event.target.value)); 
        setCurrentPage(1);   // cuando se haga el ordenamiento que empieze en la primera pagina
        setOrder(`Ordenado ${event.target.value}`) // es para que se modifique el estado local y se renderice, sin esto no se va modificar en el front
    }

    return(
        <div className={styles.letter}>
            <label>Ordenar: </label>
            <select onChange={event => handleSortDate(event)} className={styles.select} >
                <option value="">Ordenar por fecha...</option>
                <option value="near">recientes a antiguas</option>
                <option value="far">antiguas a recientes</option>
            </select>
        </div>
    )

}