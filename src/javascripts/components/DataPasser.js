import React, {useContext, useState} from 'react'
import { dataContext } from './dataSet'




export default function DataPasser(){
    const {method, setMethod} = useContext(dataContext)

    return (
        <div className='words menuItem'>
            <label htmlFor="wordLists">Method of Graphing: </label>
                <select name='wordLists' id='wordLists' value={method} onChange={e=>setMethod(e.target.value)}>
                    <option name="PCA" defaultValue={true} value="PCA">PCA</option>
                    <option name="2M"  value="2M">2 Means</option>
                </select>

                <div className='listSection'>

                    {method == 'PCA' &&
                        <div className='dataEntry'>
                            <label htmlFor='PCAInput'>Word List: </label>
                            <input type={"text"} name="PCAInput" id="PCAInput"></input>
                        </div>
                    }
                    {method == '2M' &&
                        <div className='dataEntry'>
                            <label htmlFor='2MInput1'>List one: </label>
                            <input type={"text"} name="2MInput1" id="2MInput1"></input>
                            <br /> {/* These elements could likely be put into a div for simplication, we'll have to see later :)*/}

                            <label htmlFor='2MInput2'>List two: </label>
                            <input type={"text"} name="2MInput2"  id="2MInput2"></input>
                        </div>
                        
                    }
                </div>

        </div>
    )
}
