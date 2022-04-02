/* eslint-disable eqeqeq */
import React, { useContext } from "react";
import D2Graph from "./2DGraph";
import D3Graph from "./3DGraph";
import { dataContext } from "./dataSet";

export default function GraphGen(props){
    let {numDim} = useContext(dataContext);
    
    const dims = numDim;

    if(dims == 2){
        return <D2Graph />
    }
    if(dims == 3){
        return <D3Graph />
    }


}