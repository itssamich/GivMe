import React, { useContext } from "react";
import { dataContext } from "./dataSet";

export default function SetItem(props){
    let {dataSet} = useContext(dataContext)

    const i = props.index
    

    return (
        <li className="modalOptions">
            {dataSet.labels[i-1]}
            <input type={"checkbox"} onChange={()=>{props.addToDel(i-1)}}></input>
        </li>
    )
}