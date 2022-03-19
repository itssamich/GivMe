import React, {useContext} from "react";
import { dataContext } from './dataSet';
import Plot from "react-plotly.js";

export default function D3Graph(){
    let {dataSet, setDataSet} = useContext(dataContext)

    return(
        <Plot data = {[
            {
                x: dataSet.x_points,
                y: dataSet.y_points,
                z: dataSet.z_points,
                mode: 'markers',
                type: 'scatter3d',
                name: 'idk',
                text: dataSet.labels,
                
                marker: { size: 12, color: dataSet.colors,}
            },


        ]}/>
    )
}