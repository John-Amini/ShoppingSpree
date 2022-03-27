import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createItem } from "../../../store/item"
import { Modal2 } from "../context/Modal"
import { SketchPicker,CompactPicker } from 'react-color';
const CreateItemForm = ({showModal,setShowModal}) => {
    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + '1' + ')';
    }

    const [name,setName] = useState('')
    const [weight,setWeight] = useState('')
    const [validationErrors,setValidationErrors] = useState([])
    const [color,setColor] = useState(random_rgba())
    const updateName = e => setName(e.target.value)
    const updateWeight = e => setWeight (e.target.value)
    const dispatch = useDispatch();
    const currLayout = useSelector(state => state.layouts.currLayout)
    useEffect(()=> {
        let errors = [];
        let submit = document.getElementById("submitCreateItem")
        let errorFlag = false
        // "Item with that name exists" BACKEND
        //"Weight must only contain whole positive numbers" FRONT END

        // if(validationErrors.length >= 1){
        //     validationErrors.map((err,index) => {
        //         if(err === "Item with that name exists")
        //             errors.push(validationErrors[index])
        //     })
        // }

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
       else if(parseInt(weight) === 0){
            errors.push("Weight cannot be 0")
            errorFlag = true
        }
        else if(weight.length === 0){
            errors.push("Please provide a weight")
            errorFlag = true
        }
        if(errorFlag){
            submit.disabled = true
        } else{
            submit.disabled = false
        }
           setValidationErrors(errors)

    },[name,weight])
    const handleSubmit = async e => {
        e.preventDefault();
        let submit = document.getElementById("submitCreateItem")
        submit.disabled = true
        const errors = [];
        if(name){
            let createdItem = await dispatch(createItem(name,currLayout.id,weight,color))
            if(createdItem.errors){
                errors.push(createdItem.errors);
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
            <input id="submitCreateItem" type="submit" value={"Submit"}></input>
                </form>
            </div>
        </Modal2>

    )
}

export default CreateItemForm
