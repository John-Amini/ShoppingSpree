import { useState } from "react"
import { useDispatch } from "react-redux";
import { updateItem } from "../../../store/item";
import { Modal2 } from "../../Item/context/Modal"
import './editItem.css'
function EditItemForm({item}) {
    const [showModal, setShowModal] = useState(false);
    const [name,setName] = useState(item.name)
    const [weight,setWeight] = useState(item.weight)
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedItem = await dispatch(updateItem(item.id,name,weight)) //dispatch
        if(updatedItem.errors){
            //show errors
        } else{
            setShowModal(false)
        }
    }
    const updateName = (e)=> setName(e.target.value)
    const updateWeight = (e) => setWeight(e.target.value)
    const toggleModal = e => setShowModal(true)


return <div className="editItemContainer">
      <button onClick={toggleModal}> Edit Item</button>
   {showModal && <Modal2
    title={`Edit Item for ${item.name}`}
    onClose={ () => setShowModal(false)}
    show ={showModal}
>
    <form onSubmit={handleSubmit}>
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
    <input id='submitEditItem' type={'submit'}></input>

    </form>
</Modal2>
}
</div>
}

export default EditItemForm
