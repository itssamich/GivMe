import React, {useState, useEffect, createContext} from 'react'
import GraphGen from './GraphGen';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export const dataContext = createContext();

export default function DataSet(){
    const [dataName, setDataName] = useState('I');
    const [numDim, setNumDim] = useState(2);
    const [dataSet, setDataSet] = useState();
	const [clusterCount, setClusterCount] = useState(1);
    const [updateChecker, setUpdateChecker] = useState(true);

    useEffect(() => {
        if(updateChecker){
          fetch(`http://10.9.31.106:5000/${dataName}`)
          .then(res => {return res.json()})
          .then(data=>{
            setDataSet(data)

          })
          .catch(err => console.log('Error: ' + err))
        }
        setUpdateChecker(false);
    },[updateChecker])
    

    if(!dataSet){
      return (
        <p></p>
        )
      
    }

	var val = clusterCount;

    return(
      <dataContext.Provider value = {{dataSet, setDataSet, numDim, clusterCount}}>
        <div className='bigContainer'>
			<div className="graph">
				<div className="row">
					<GraphGen />
				</div>
			</div>
        
			<div className='menu'>
				<div className='words'>
				<label htmlFor="wordLists">{dataName}</label>
					<select name='wordLists' id='wordLists' value={dataName} onChange={e=>setDataName(e.target.value)}>
					<option name='#' defaultValue={true} hidden={true}>---</option>
					<option value='I'>I</option>
					<option value='Adj'>Adjectives</option>
					<option value='Death'>Death</option>
					</select>
				</div>
				<div className='dimension'>
				<label htmlFor='dimensionCount'># of Dimensions </label>
					<select name='dimensionCount' value={numDim} onChange={e=>setNumDim(e.target.value)}>
					<option name='#' defaultValue={true} hidden={true}>#</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					</select>
				</div>
				<div className='cluster'>
					<label htmlFor='kClusterCount'>Cluster Count: {val}</label>
					<Slider onChange={e=>setClusterCount(e.target.value)} valueLabelDisplay="auto" defaultValue={1} step={1} marks min={1} max={5} width={'100%'}/>
				</div>

				<button type="button" className="btn btn-dark" onClick={e=>{setClusterCount(val); setUpdateChecker(true)}}>Go</button>
			
				<div className='coveragePercentage'>
					<h2>% of information currently visible: {dataSet.info_represented[numDim-2].toFixed(2)}%</h2>
				</div>
			</div>
		</div>
      </dataContext.Provider>
    )
}