import React, {useContext, useState} from "react";
import { dataContext } from './dataSet';
import Plot from "react-plotly.js";


export default function D2Graph(){
    let {dataSet, setDataSet, clusterCount} = useContext(dataContext)
    const [theme, setTheme] = useState();

    return(
        <Plot 
        data = {[
            {
                x: dataSet.x_points,
                y: dataSet.y_points,
                mode: 'markers',
                type: 'scatter',
                name: 'idk',
                text: dataSet.labels,
                
                marker: { size: 12, color: dataSet.colors[clusterCount-2], symbol: 'circle',}
            }
        ]}
        config ={{
            displaylogo: false,
            responsive: true,
        }}
        layout = {{
            autosize: false,
            width: "900px",
            height: "1200px",
            margin: 0,
            paper_bgcolor: "#000",
            plot_bgcolor: "#363537",
            outlinecolor: "#212529",


            xaxis: {
                title: {
                    text: "1st Principal Component"
                }
            },
            yaxis: {
                title: {
                    text: "2nd Principal Component"
                }
            }
        }}
        />
    )
}