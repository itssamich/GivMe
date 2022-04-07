import React, { useContext, useState } from "react";
import { dataContext } from "./dataSet";
import SetItem from "./SetItem";
import {Modal, Button} from 'react-bootstrap'

export default function ListMenu(props){
    let {dataSet, setDataSet} = useContext(dataContext)
    const [showList, setShowList] = useState(false)
    const handleClose = () => setShowList(false);
    const handleShow = () => setShowList(true)

    let selectedWords = []

    function addToDel(val){
        console.log(dataSet.labels[val])
        if(selectedWords.includes(dataSet.labels[val])){
            selectedWords.splice(selectedWords.indexOf(dataSet.labels[val]), 1)
        }
        else{
            selectedWords.push(dataSet.labels[val])
        }
        console.log(selectedWords)
    }

    function delVal(val){
        for(let i = 0; i < selectedWords.length; i++){
            props.deletePoints(selectedWords[i])
        }  
        props.handleSubmit(1)//I legitamently give up, I can't get it to update the graph properly without calling the whole function again, idk why and I have other things to fix. -AK
    }


    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Edit List
        </Button>

        <Modal show={showList} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>List Editor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='listWords'>
                    <ul>
                    {
                        dataSet.labels.map((e, i) => {
                            return <SetItem key = {i+1} index = {i+1} addToDel={addToDel}/>
                        })
                    }
                    </ul>
                    

                </div>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
                Close
            </Button>
            <button type="button" className="btn btn-primary" onClick={() => {delVal();  handleClose()}}>Update</button>
            </Modal.Footer>
        </Modal>
        </>
    )

}