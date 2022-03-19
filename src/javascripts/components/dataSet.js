import React, {useState, useEffect, createContext} from 'react'
import GraphGen from './GraphGen';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export const dataContext = createContext();

export default function DataSet(){
    const [dataName, setDataName] = useState('');
    const [numDim, setNumDim] = useState();
    const [dataSet, setDataSet] = useState();
	const [clusterCount, setClusterCount] = useState();
    const [updateChecker, setUpdateChecker] = useState(true);

    useEffect(() => {
        if(updateChecker){
          fetch(`./sample${dataName}.json`)
          .then(res => {return res.json()})
          .then(data=>{
            setDataSet(data)

          })
          .catch(err => console.log('Error: ' + err))
        }
        setUpdateChecker(false);
    },[updateChecker])
    

	var val = 0;

    if(!dataSet){
      return (
        <div className='container'>
            <div className='row'>
              <div className='col-9 graphCol'>
                No Data
              </div>
              <div className='col-3 menuCol'>
              <label htmlFor="wordLists">{dataName}</label>
                <select name='wordLists' id='wordLists' value={dataName} onChange={e=>setDataName(e.target.value)}>
                  <option name='#' defaultValue={true} hidden={true}>---</option>
                  <option value='I'>I</option>
                  <option value='Graph'>Adjectives</option>
                  <option value='Death'>Death</option>
                </select>

                <label htmlFor='dimensionCount'># of Dimensions</label>
                <select name='dimensionCount' value={numDim} onChange={e=>setNumDim(e.target.value)}>
                  <option name='#' defaultValue={true} hidden={true}>#</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                </select>

				<label htmlFor='kClusterCount'>Cluster Count</label>
				<Slider onChange={e=>{
					val = e.target.value;
					console.log(val)}} valueLabelDisplay="auto" defaultValue={1} step={1} marks min={1} max={10} />

                <button type="button" className="btn btn-dark" onClick={e=>{setClusterCount(val); setUpdateChecker(true)}}>Go</button>
              </div>
            </div>
        </div>
        )
      
    }

    return(
      <dataContext.Provider value = {{dataSet, setDataSet, numDim}}>
        
        <div className='container'>
            <div className='row'>
              <div className='col-9 graphCol'>
                <GraphGen numDim />
				
              </div>
              <div className='col-3 menuCol'>
              <label htmlFor="wordLists">{dataName}</label>
                <select name='wordLists' id='wordLists' value={dataName} onChange={e=>setDataName(e.target.value)}>
                  <option name='#' defaultValue={true} hidden={true}>---</option>
                  <option value='I'>I</option>
                  <option value='Graph'>Adjectives</option>
                  <option value='Death'>Death</option>
                </select>

                <label htmlFor='dimensionCount'># of Dimensions</label>
                <select name='dimensionCount' value={numDim} onChange={e=>setNumDim(e.target.value)}>
                  <option name='#' defaultValue={true} hidden={true}>#</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                </select>

				<label htmlFor='kClusterCount'>Cluster Count</label>

                <button type="button" className="btn btn-dark" onClick={e=>setUpdateChecker(true)}>Go</button>
              </div>
            </div>
        </div>
      </dataContext.Provider>
    )
}