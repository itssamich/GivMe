import React, {useContext, useState} from "react";
import { dataContext } from './dataSet';
import Plot from "react-plotly.js";


export default function D2Graph(){
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
                mode: 'markers',
                type: 'scatter',
                name: 'idk',
                text: dataSet.labels,
                
                marker: { size: 12, color: colors, symbol: 'circle',}
            }
        ]}
        config ={{
            displaylogo: false,
            responsive: 'true',
        }}
        layout = {{
            autosize: 'true',  
            paper_bgcolor: theme.paperBG,
            plot_bgcolor: theme.plotBG,
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
        useResizeHandler = {true} 
            style = {{
                borderRadius: "30px",
                margin: "15px",
                width: "55%", 
                height: "100%"}}
        />
        
    )
}