import React, {useContext} from "react";
import { dataContext } from './dataSet';
import Plot from "react-plotly.js";

export default function D3Graph(){
    let {dataSet, setDataSet,clusterCount} = useContext(dataContext)

    return(
        <Plot 
        data = {[
            {
                x: dataSet.x_points,
                y: dataSet.y_points,
                z: dataSet.z_points,
                responsive: true,
                mode: 'markers',
                type: 'scatter3d',
                name: 'idk',
                text: dataSet.labels,
                
                marker: { size: 10, color: dataSet.colors[clusterCount-2],}
            }
        ]}
        layout = {{
            autosize: false,
            width: "900px",
            height: "1200px",
            margin: 0,

            title: `"${dataSet.list_name}" word list`,
            scene : {
                xaxis:{title: '1st Principal Conponent'},
                yaxis:{title: '2nd Principal Conponent'},
                zaxis:{title: '3rd Principal Conponent'},
            }
        }}
        config = {{
            responsive: true,
            displaylogo: false
        }}/>
    )
}