import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { updateItem } from "../../../store/item";
import { Modal2 } from "../../Item/context/Modal"
import { SketchPicker,CompactPicker } from 'react-color';

import './editItem.css'
import EditItemForm2 from "../EditItemForm2";
function EditItemForm({item,editOnGrid}) {
    const [showModal, setShowModal] = useState(false);
    const [name,setName] = useState(item.name)
    const [weight,setWeight] = useState(item.weight)
    const [color,setColor] = useState(item.color)
    const [validationErrors,setValidationErrors] = useState([])

    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedItem = await dispatch(updateItem(item.id,name,weight,color)) //dispatch
        if(updatedItem.errors){
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
            errors.push("Name is a maximum of 16 characters")
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
let editForm;
if(showModal){
    editForm = <EditItemForm2
    item={item}
    editOnGrid={editOnGrid}
    showModal={showModal}
    setShowModal ={setShowModal}>
    </EditItemForm2>
}
return <div className="editItemContainer">
      <button className="editItem edit" onClick={toggleModal}>Edit</button>
    {showModal && editForm}
</div>
}

export default EditItemForm
