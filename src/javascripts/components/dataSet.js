import React, {useState, useEffect} from 'react'
import Graph from './Graph';

export default function DataSet(){

    const [dataSet, setDataset] = useState([]);


    useEffect(() => {
        fetch('./sampleGraph.json')
            .then(res => {return res.json()})
            .then(data=>{
              var x = []
              var y = []

              for(var i = 0; i < data.points.length; i++){
                x.push(data.points[i][0])
                y.push(data.points[i][1])
              }
              const labels = data.labels
              const values = [x, y, labels]
              setDataset(values)
            })
            .catch(err => console.log('Error: ' + err))
    },[])

    console.log(dataSet)

    return(
        <div className='container'>
        <div className='row'>
          <div className='col-8 graphCol'>
            Graph data
            <div className='graph container'>
              <Graph dataSet />
            </div>
          </div>
          <div className='col-4 menuCol'>
            <label htmlFor="wordLists">Word Lists</label>
            <select name='wordLists' id='wordLists'>
              <option name='#' defaultValue={true} hidden={true}>---</option>
              <option value='test'>Test</option>
            </select>

            <label htmlFor='dimensionCount'># of Dimensions</label>
            <select name='dimensionCount'>
              <option name='#' defaultValue={true} hidden={true}>#</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>

            <button type="button" className="btn btn-dark">Go</button>
          </div>
        </div>
      </div>

    )
}