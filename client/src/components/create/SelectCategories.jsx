import React from "react";
import styles from "../home/css/Filtrado.module.css";

export default function SelectCategories({handleSelect}){
    const categories = [
        "Alimentacion",
        "Cuentas y pagos",
        "Casa",
        "Transporte",
        "Ropa" ,
        "Salud e hingiene",
        "Diversion",
        "Otros gastos" ];
    
    return(
        <div>
            <label >Categorias :</label>
            <select onChange={event => handleSelect(event)} className={styles.select} >
                <option value="nada">Seleciona una categoria</option>
                {categories.map(el =>{
                    return(
                        <option value={el.toLocaleLowerCase()} key={el} >{el}</option>
                    )
                })}
            </select>
        </div>
    )

}