import React, { useContext } from "react";
import { dataContext } from "./dataSet";

export default function SetItem(props){
    let dataSet = useContext(dataContext)

    const i = props.index

    function deleteValue(index){
        dataSet.dataSet.labels.splice(index, 1);
        dataSet.dataSet.x_points.splice(index, 1);
        dataSet.dataSet.y_points.splice(index, 1);
        dataSet.dataSet.z_points.splice(index, 1);
    }
 //deleteValue(i-1)
    
    return (
        <li>
            {dataSet.dataSet.labels[i-1]}
            <button className="deleteItem btn btn-danger" onClick={() => {deleteValue(i-1)}}>delete</button>
            <button className="deleteItem btn btn-danger" onClick={() => {}}>change shape</button>
        </li>
    )
}