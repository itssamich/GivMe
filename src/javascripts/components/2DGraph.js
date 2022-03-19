import React, {useContext} from "react";
import { dataContext } from './dataSet';
import Plot from "react-plotly.js";

export default function D2Graph(){
    let {dataSet, setDataSet} = useContext(dataContext)

    return(
        <Plot data = {[
            {
                x: dataSet.x_points,
                y: dataSet.y_points,
                mode: 'markers',
                type: 'scatter',
                name: 'idk',
                text: dataSet.labels,
                
                marker: { size: 12, color: dataSet.colors,}
            },


        ]}/>
    )
}