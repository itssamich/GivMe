import React, { useContext } from "react";
import { dataContext } from "./dataSet";

export default function OptionValue(props){
    let {dataList} = useContext(dataContext)

    const i = props.index
    return (
        <option key={i} value={dataList[i]}>{dataList[i]}</option>
    )
}