import React from "react";
import styles from "./css/Home.module.css"


export default function Paginado({allOperations , operationsPerPage, paginado }){
    const pageNumber = [];
    let number = Math.ceil(allOperations / operationsPerPage);
    for(let i=1; i <= number ; i++){
        pageNumber.push(i);
    }
    return(
        <nav>
            <ul>
                {pageNumber && pageNumber.length > 1 &&
                pageNumber.map( el => {
                    return(
                        <button key={el} onClick= {() => paginado(el) } className={styles.paginadoButton}  >{el}</button>
                    )
                }) }
            </ul>
        </nav>
    )
}