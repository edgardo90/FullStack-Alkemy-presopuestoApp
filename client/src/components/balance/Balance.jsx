import React from "react";
import styles from "../home/css/Home.module.css"

export default function Balance( {finalBalance , finalIncome , finalExpenditure } ){
    return(
        <div className={styles.balance2}>
            <h1>Balance actual:
                <br />
                ${finalBalance}
            </h1>
            <h5 style={{color: "green"}} >Total de ingresos: {finalIncome}</h5>
            <h5 style={{color: "red"}}>Total de egresos:   {finalExpenditure}</h5>
        </div>
    )
}