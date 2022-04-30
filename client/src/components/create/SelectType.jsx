import React from "react";

export default function SelectType({handleRadio}){

    const type = ["ingreso" , "egreso"];

    return(
        <div>
            <label >Tipo :  </label>
            {type.map( el =>{
                return(
                <label key={el}> {el}
                 <input
                  style={{cursor:"pointer"}}
                  type="radio"
                  id={el}
                  name="type"
                  value={el}
                  onChange={event => handleRadio(event)}
                />/
                </label>
                )
            })}
        </div>
    )
}