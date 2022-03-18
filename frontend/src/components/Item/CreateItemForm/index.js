import { useState } from "react"
import { Modal2 } from "../context/Modal"

const CreateItemForm = ({showModal,setShowModal}) => {
    const [name,setName] = useState('')
    // const [weight,setWeight] = useState('')
    const [validationErrors,setValidationErrors] = useState([])
    const updateName = e => setName(e.target.value)
    // const updateWeight = e => setWeight (e.target.value)
    const handleSubmit = async e => {
        e.preventDefault();
        const errors = [];
        if(name){
            let createdItem = {} //dispatch here
            if(createdItem.error){
                errors.push(createdItem.error);
                setValidationErrors(errors)
            }
            else{
                setShowModal(false)
            }
        }
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
            <input id="submitCreateItem" type="submit"></input>
                </form>
            </div>
        </Modal2>

    )
}

export default CreateItemForm
