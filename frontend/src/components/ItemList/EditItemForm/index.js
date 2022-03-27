import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { updateItem } from "../../../store/item";
import { Modal2 } from "../../Item/context/Modal"
import { SketchPicker,CompactPicker } from 'react-color';

import './editItem.css'
import EditItemForm2 from "../EditItemForm2";
function EditItemForm({item,editOnGrid}) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = e => setShowModal(true)

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
