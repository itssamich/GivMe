import React, { useContext } from 'react'
import CanvasJSReact from '../canvasjs.react'
import { dataContext } from './dataSet';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Graph(){
    let {dataSet, setDataSet} = useContext(dataContext)

    console.log(dataSet)
    const options = {
        theme: 'dark2',
        zoomEnabled: true,
        title: {
            text: dataSet[0]
        },
        axisX:{
            title: 'IDK X Something',
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY:{
            title: 'IDK Y Something',
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            dataPoints: dataSet.points,

            }
        ]
    }
    
    return(
        <div className='graph container'>
            <p>{dataSet[0]}</p>
            <br />
            <p>{dataSet[1]}</p>
            <CanvasJSChart options={options} />
        </div>
    )

}