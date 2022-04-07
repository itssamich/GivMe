import React, {useState, useEffect, createContext} from 'react'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../jsstyles/theme';
import { GlobalStyles } from '../jsstyles/global';
import GraphGen from './GraphGen';
import Slider from '@mui/material/Slider';
import DataPasser from './DataPasser';
import DarkModeToggle from "react-dark-mode-toggle";
import { Checkbox } from '@mui/material';
import SetItem from './SetItem';
import reactPlotly from 'react-plotly.js';
import ListMenu from './ListMenu';


export const dataContext = createContext();


export default function DataSet(){
    const [dataName, setDataName] = useState('I');
	const [dataList, setDataList] = useState([]);
    const [numDim, setNumDim] = useState(2);
    const [dataSet, setDataSet] = useState();
	const [clusterCount, setClusterCount] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(() => true);


	const [method, setMethod] = useState('PCA')

	var val = clusterCount;

	function handleSubmit(type){
		let body = [method]
		let tempBody = []
		let valid = true;

		if(type === 0){
			if(method == 'PCA'){
				tempBody = document.getElementById('PCAInput').value.split(/ *, */); //RegEx to split around any number of spaces before or after a comma
				if(!inputCleaner(tempBody)){
					valid = false
				}
				else{
					body.push(tempBody)
					document.getElementById('PCAInput').value=""
				}
			}
			else{
				
				tempBody = document.getElementById('2MInput1').value.split(/ *, */)
				if(!inputCleaner(tempBody)){
					valid = false
				}
				else{
					body.push(tempBody)
					document.getElementById('2MInput1').value = ""
				}
				tempBody = document.getElementById('2MInput2').value.split(/ *, */)
				if(!inputCleaner(tempBody)){
					valid = false
				}
				else{
					body.push(tempBody)
					document.getElementById('2MInput2').value = ""
				}
			}	
		}
		else if(type === 1){
			
			body.push(dataSet.labels)
			console.log(body)
		}

		if(valid){
			console.log(JSON.stringify(body))

			fetch(`https://shunnshine.pythonanywhere.com/`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(res => {return res.json()})
			.then(data => {
				if(data.removed.length > 0) {
					let words = []
					for(let i = 0; i < data.removed.length; i++){
						words.push(data.removed[i])
					}
					alert("Removed Words: " + words)
				}
					
					setDataSet(data)})
		}
	}

	function inputCleaner(values){
		if(values.length  <= 1 && values[0] == ""){ //has to check if the value contained is a blank value as there will always at least one value due to the split
			alert("There must be at least one value in each list")
			return false
		}
		return true
	}

	function deletePoints(val){
		// let tempData = {...dataSet}
		
		// const i = tempData.labels.indexOf(val)
		// tempData.labels.splice(i, 1)
		// tempData.x_points.splice(i, 1)
		// tempData.y_points.splice(i, 1)
		// tempData.z_points.splice(i, 1)
		// for(let i = 0; i < tempData.colors.length; i++){
		// 	tempData.colors[i].splice(i, 1)
		// }
		// setDataSet(tempData)

		const i = dataSet.labels.indexOf(val)
		dataSet.labels.splice(i, 1)
		dataSet.x_points.splice(i, 1)
		dataSet.y_points.splice(i, 1)
		dataSet.z_points.splice(i, 1)
		for(let i = 0; i < dataSet.colors.length; i++){
			dataSet.colors[i].splice(i, 1)
		}
		
	}


    return(
      <dataContext.Provider value = {{dataSet, setDataSet, numDim, clusterCount, dataList, dataName, method, setMethod, isDarkMode}}>


        <div className='mainContent'>

			<div className='menu'>

				<div className='menuTitle'>
					<h1>Settings</h1>
				</div>
				<div className='viewColorShifter'>
					Toggle Viewing Modes: 
					<ThemeProvider theme={isDarkMode === false ? lightTheme: darkTheme}>
						<>
							<GlobalStyles />
							<DarkModeToggle 
									onChange={setIsDarkMode}
									checked={isDarkMode}
									size={50}
							/>
						</>
					</ThemeProvider>
				</div>


				<DataPasser /> 
				<div className='dimension menuItem'>
				<label htmlFor='dimensionCount'># of Dimensions: </label>
					<select name='dimensionCount' value={numDim} onChange={e=>setNumDim(e.target.value)}>
					<option name='#' defaultValue={true} hidden={true}>#</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					</select>
				</div>
				{method == "PCA" 

					?	<div className='PCAInformation'>
						<div className='cluster menuItem'>
							<label htmlFor='kClusterCount'>Cluster Count: {val}</label>
							<Slider onChange={e=>setClusterCount(e.target.value)} valueLabelDisplay="auto" defaultValue={1} step={1} marks min={1} max={5} width={'90%'}/>
						</div>
						<button type="button" className="btn btn-primary" onClick={e=>{handleSubmit(0)}}>Run</button>
					
						<div className='coveragePercentage'>
							{dataSet 
								?	<h2>% of information currently visible: <br/>{dataSet.info_represented[numDim-2].toFixed(2)}%</h2>
								:   <h2>% of information currently visible: <br/>--.--%</h2>
							}
						</div>
					</div>
					:	<button type="button" className="btn btn-success" onClick={e=>{handleSubmit(0)}}>Run</button>

				}
				{dataSet
                ? 
                <ListMenu deletePoints={deletePoints} handleSubmit={handleSubmit}/>
                : <p></p>
            }
			</div>

			{dataSet 
				? <GraphGen />
				: <p></p>
			}
			
		</div>




      </dataContext.Provider>
    )
}