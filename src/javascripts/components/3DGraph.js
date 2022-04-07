import React, {useContext} from "react";
import { dataContext } from './dataSet';
import Plot from "react-plotly.js";
import { flexbox, width } from "@mui/system";

export default function D3Graph(){
    let {dataSet, setDataSet, clusterCount, isDarkMode, method} = useContext(dataContext)
    let theme = {}

    let colors = []

    if(method == "2M"){
        colors = dataSet.colors
    }
    else{
        colors = dataSet.colors[clusterCount-2]
    }

    if(isDarkMode){
        theme = {
            "paperBG": "#000",
            "plotBG": "#363537"
        }
    }
    else{
        theme = {
            "paperBG": "#fff",
            "plotBG": '#E2E2E2'
        }
    }
    return(
        <Plot 
            data = {[
                {
                    x: dataSet.x_points,
                    y: dataSet.y_points,
                    z: dataSet.z_points,
                    mode: 'markers',
                    type: 'scatter3d',
                    name: 'idk',
                    text: dataSet.labels,
                    
                    marker: { size: 10, color: colors,}
                }
            ]}
            layout = {{
                autosize: 'true',       
                paper_bgcolor: theme.paperBG,
                plot_bgcolor: theme.plotBG,
                outlinecolor: "#212529",
                uirevision: 'true',
                scene : {
                    aspectmode: "auto",
                    xaxis:{title: '1st Principal Conponent'},
                    yaxis:{title: '2nd Principal Conponent'},
                    zaxis:{title: '3rd Principal Conponent'},
                }
            }}
            config = {{
                displaylogo: false
            }}
            useResizeHandler = {true} 
            style = {{
                borderRadius: "30px",
                margin: "15px",
                width: "55%", 
                height: "100%"}}
        />
    )
}

