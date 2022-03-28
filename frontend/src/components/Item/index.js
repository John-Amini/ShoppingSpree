import { useState } from "react"
import { useSelector } from "react-redux"
import ItemList from "../ItemList"
import CreateItemForm from "./CreateItemForm"

const Item = ({removeFromGrid ,editOnGrid ,setCurrPointer,currPointer}) => {
    const sessionUser = useSelector(state => state.session.user)
    // need to load items for current layout
    // let items = useSelector(state => state.)
    const [showItemCreateModal,setShowItemCreateModal] = useState(false)
    const toggleShowItemCreateModal = () => {
        setShowItemCreateModal(!showItemCreateModal)
    }
    return (
    <div className="itemsFullContainer">
        <div className="createItemButtonWrapper">
        <button className={"createItemButton create"}onClick={toggleShowItemCreateModal}>New Item</button>
        </div>
        <ItemList currPointer={currPointer} setCurrPointer={setCurrPointer} removeFromGrid={removeFromGrid} editOnGrid={editOnGrid}></ItemList>
        {showItemCreateModal && <CreateItemForm showModal={showItemCreateModal}
        setShowModal={setShowItemCreateModal}
        ></CreateItemForm>}
    </div>






    )
}
export default Item;
