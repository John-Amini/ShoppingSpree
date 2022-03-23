import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { updateItem } from "../../../store/item";
import { Modal2 } from "../../Item/context/Modal"
import { SketchPicker,CompactPicker } from 'react-color';

function EditItemForm2({item,editOnGrid,showModal,setShowModal}) {
    const [name,setName] = useState(item.name)
    const [weight,setWeight] = useState(item.weight)
    const [color,setColor] = useState(item.color)
    const [validationErrors,setValidationErrors] = useState([])

    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        let errors = []

        e.preventDefault();
        let updatedItem = await dispatch(updateItem(item.id,name,weight,color)) //dispatch
        if(updatedItem.errors){
            errors.push(updatedItem.errors)
            setValidationErrors(errors)
            //show errors
        } else{
            editOnGrid(item.id,color)
            setShowModal(false)
        }
    }

    useEffect(()=> {
        let errors = [];
        let submit = document.getElementById("submitEditItem")
        let errorFlag = false

        if(name.length === 0){
            errors.push("Please provide a name")
            errorFlag = true
        }
        else if(name.length > 16){
            errors.push("Name cannot be greater than 16 characters")
            errorFlag = true
        }

        if(weight.length !== 0 && !/^[0-9]+$/.test(weight)){
            errors.push("Weight must only contain positive whole numbers")
            errorFlag = true
        }
        if(parseInt(weight)===0){
            errors.push("Weight cannot be 0")
            errorFlag = true
        }
        else if(weight.length === 0){
            errors.push("Please provide a weight")
            errorFlag = true
        }
        if(submit){

            if(errorFlag){
            submit.disabled = true
        } else{
            submit.disabled = false
        }
        if(name === item.name && parseInt(weight) === parseInt(item.weight) && color === item.color)
        {
            submit.disabled = true
        }
        setValidationErrors(errors)
        }
    },[name,weight,color])
    const updateName = (e)=> setName(e.target.value)
    const updateWeight = (e) => setWeight(e.target.value)
    const toggleModal = e => setShowModal(true)

    const handleColorPick =(color) => {
        setColor(color.hex)
    }
let count = 0
return <Modal2
    title={`Edit Item for ${item.name}`}
    onClose={ () => {
    setShowModal(false)}}
    show ={showModal}
>
    <form onSubmit={handleSubmit}>
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
    type="text"
    placeholder="Name"
    value={name}
    onChange={updateName}
    ></input>
    <input
    type="number"
    placeholder="Weight"
    value={weight}
    onChange={updateWeight}
    >
    </input>
    <CompactPicker
            color={ color}
            onChangeComplete={ handleColorPick}></CompactPicker>
    <input
    disabled = {true}
    id='submitEditItem' type={'submit'}></input>

    </form>
</Modal2>
}

export default EditItemForm2
