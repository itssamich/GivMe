import React, {useEffect, useState} from "react";



export default function DataSet(){

    const [dataSet, setDataset] = useState([]);


    useEffect(() => {
        fetch('./sampleGraph.json')
            .then(res => {console.log(res); return res.json()})
            .then(data=>console.log(data.points))
            .catch(err => console.log('Error: ' + err))
    },[])

    return(
        <div className='container'>
        <div className='row'>
          <div className='col-8 graphCol'>
            Graph data
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