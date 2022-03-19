import React, {useState, useEffect, createContext} from 'react'
import Graph from './Graph';

export const dataContext = createContext();

export default function DataSet(){
    const [dataName, setDataName] = useState('I');
    const [dataSet, setDataSet] = useState();

    useEffect(() => {
        fetch(`./sampleGraph.json`)
            .then(res => {return res.json()})
            .then(data=>{
              setDataSet(data)

            })
            .catch(err => console.log('Error: ' + err))
    },[])
    
    if(!dataSet){
      return <p>Loading Data..</p>
    }

    console.log(dataSet)

    return(
      <dataContext.Provider value = {{dataSet, setDataSet}}>
        <div className='container'>
            <div className='row'>
              <div className='col-9 graphCol'>
                <Graph />
              </div>
              <div className='col-3 menuCol'>
                <label htmlFor="wordLists">{dataName}</label>
                <select name='wordLists' id='wordLists' value={dataName} onChange={e=>setDataName(e.target.value)}>
                  <option name='#' defaultValue={true} hidden={true}>---</option>
                  <option value='I' defaultValue={true}>I</option>
                  <option value='Graph'>Adjectives</option>
                </select>

                <label htmlFor='dimensionCount'># of Dimensions</label>
                <select name='dimensionCount'>
                  <option name='#' defaultValue={true} hidden={true}>#</option>
                  <option value='2'>2</option>
                </select>

                <button type="button" className="btn btn-dark">Go</button>
              </div>
            </div>
        </div>
      </dataContext.Provider>
    )
}