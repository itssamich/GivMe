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


export const dataContext = createContext();


export default function DataSet(){
    const [dataName, setDataName] = useState('I');
	const [dataList, setDataList] = useState([]);
    const [numDim, setNumDim] = useState(2);
    const [dataSet, setDataSet] = useState();
	const [clusterCount, setClusterCount] = useState(1);
    const [isDarkMode, setIsDarkMode] = useState(() => true);
	const [showList, setShowList] = useState(false)

	const [method, setMethod] = useState('PCA')

	var val = clusterCount;

	function handleSubmit(){
		let body = [method]
		let tempBody = []
		let valid = true;
		if(method == 'PCA'){
			tempBody = document.getElementById('PCAInput').value.split(/ *, */); //RegEx to split around any number of spaces before or after a comma
			if(!inputCleaner(tempBody)){
				valid = false
			}
			else{
				body.push(tempBody)
			}
		}
		else{
			
			tempBody = document.getElementById('2MInput1').value.split(/ *, */)
			if(!inputCleaner(tempBody)){
				valid = false
			}
			else{
				body.push(tempBody)
			}
			tempBody = document.getElementById('2MInput2').value.split(/ *, */)
			if(!inputCleaner(tempBody)){
				valid = false
			}
			else{
				body.push(tempBody)
			}
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

	function refreshGraph(){
		
	}

	console.log(dataSet)

    return(
      <dataContext.Provider value = {{dataSet, setDataSet, numDim, clusterCount, dataList, dataName, method, setMethod}}>


        <div className='bigContainer'>
			{dataSet && 
				<div className="graph">
					<div className="row">
						<GraphGen />
					</div>
				</div>
			}
			<div className='menu'>
				<div className='menuTitle'>
					<h1>Settings</h1>
				</div>
				<div className='viewColorShifter'>
					<ThemeProvider theme={isDarkMode === false ? lightTheme: darkTheme}>
						<>
							<GlobalStyles />
							<DarkModeToggle 
									onChange={setIsDarkMode}
									checked={isDarkMode}
									size={80}
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
							<Slider onChange={e=>setClusterCount(e.target.value)} valueLabelDisplay="auto" defaultValue={1} step={1} marks min={1} max={5} width={'100%'}/>
						</div>
						<button type="button" className="btn btn-dark" onClick={e=>{handleSubmit()}}>Run</button>
					
						<div className='coveragePercentage'>
							{dataSet 
								?	<h2>% of information currently visible: <br/>{dataSet.info_represented[numDim-2].toFixed(2)}%</h2>
								:   <h2>% of information currently visible: <br/>--.--%</h2>
							}
						</div>
					</div>
					:	<button type="button" className="btn btn-dark" onClick={e=>{handleSubmit()}}>Run</button>

				}
				<Checkbox onChange={() => {if(showList){setShowList(false)}else{setShowList(true)}}} />
			</div>
			<div className='listMenu'>
				{dataSet 
					? showList
						?   <div className='listWords'>
								<ul>
								{
									dataSet.labels.map((e, i) => {
										return <SetItem key = {i+1} index = {i+1}/>
									})
								}
								</ul>
								<button type="button" className="btn btn-dark" onClick={e=>setClusterCount(1)}>Run</button>

							</div>
						: <p></p>
					: <p></p>
				}
			</div>
		</div>



		<div className='context'>
			<div className='header'>
				<h1>About GivMe</h1>
			</div>
			<div className='text'>
				<span>
					This application is a tool for visualizing and manipulating word embeddings. A word embedding is a collection of points generated by a computer where each point represents the meaning of a unique word. 
					Word embeddings are generated by neural networks and thus are, by nature, a black box and hard to visualize. There is research currently being done to study the structure and improvement of word embeddings. Our web app seeks to streamline some of this study. 
				</span>
				<br /><br />
				<span>
				To accomplish this we've preloaded our app with groupings of similar words. The user can choose one of these words lists, and our app will calculate the best view to specifically represent those words. This is accomplished using a technique called Principal Component Analysis (PCA). PCA takes information in a high dimensional space and condenses it into a more friendly space like 2 or 3 dimensions. We lose some details, as with any simplification, while we're condensing the data, but PCA guarantees that we preserve the maximum amount of information (seen in the percentage above) while making it easier for a human to visualize.
				</span>
				<br /><br />
				<span>
				Now that we've squashed our word points into a space that we can understand, we can use our human brains to find patterns, reverse engineer the information in the embeddings, and with some effort develop algorithms to improve the next generation of natural language processing. To guarantee the usefulness of this app we tried to make the user experience as friendly as possible. Our goal was to make this app responsive and intuitive to use, and we are really happy with how it turned out.
				</span>
				<br /><br />

			</div>

		</div>
      </dataContext.Provider>
    )
}