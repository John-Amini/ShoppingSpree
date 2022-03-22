import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createItem } from "../../../store/item"
import { Modal2 } from "../context/Modal"
import { SketchPicker,CompactPicker } from 'react-color';
const CreateItemForm = ({showModal,setShowModal}) => {
    const [name,setName] = useState('')
    const [weight,setWeight] = useState('')
    const [validationErrors,setValidationErrors] = useState([])
    const [color,setColor] = useState('#fff')
    const updateName = e => setName(e.target.value)
    const updateWeight = e => setWeight (e.target.value)
    const dispatch = useDispatch();
    const currLayout = useSelector(state => state.layouts.currLayout)
    useEffect(()=> {
        if(!/^[0-9]+$/.test(weight));


    },[weight])
    const handleSubmit = async e => {
        e.preventDefault();
        const errors = [];
        if(name){
            let createdItem = await dispatch(createItem(name,currLayout.id,weight,color))
            if(createdItem.error){
                errors.push(createdItem.error);
                setValidationErrors(errors)
            }
            else{
                setShowModal(false)
            }
        }
    }
    const handleColorPick =(color) => {
        setColor(color.hex)
    }
    let count = 0
    return (
        <Modal2
        title={"Add new Item"}
        onClose = {()=> setShowModal(false)}
        show = {showModal}
        >
            <div>
                <form className="createItemForm" onSubmit={handleSubmit}>
                <div>
          {validationErrors.length > 0 && (
            <div className='errorsContainer'>
              {validationErrors.map(currError => {
                return <p key={`error-${count++}`}>{currError}</p>;
              })}
            </div>
          )}
            </div>
            <input
            type="textarea"
            id='nameInput'
            placeholder="Name"
            value={name}
            onChange={updateName}>
            </input>
            <input
            type="number"
            id="weightInput"
            placeholder="Weight"
            value={weight}
            onChange={updateWeight}>
            </input>
            <CompactPicker
            color={ color}
            onChangeComplete={ handleColorPick}></CompactPicker>
            <input id="submitCreateItem" type="submit"></input>
                </form>
            </div>
        </Modal2>

    )
}

export default CreateItemForm
