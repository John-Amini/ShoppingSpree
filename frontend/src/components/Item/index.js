import { useState } from "react"
import { useSelector } from "react-redux"
import ItemList from "../ItemList"
import CreateItemForm from "./CreateItemForm"

const Item = () => {
    const sessionUser = useSelector(state => state.session.user)
    // need to load items for current layout
    // let items = useSelector(state => state.)
    const [showItemCreateModal,setShowItemCreateModal] = useState(false)
    const toggleShowItemCreateModal = () => {
        setShowItemCreateModal(!showItemCreateModal)
    }
    return (
    <div className="itemsFullContainer">
        <button onClick={toggleShowItemCreateModal}>Create New Item</button>
        <ItemList></ItemList>
        {showItemCreateModal && <CreateItemForm showModal={showItemCreateModal}
        setShowModal={setShowItemCreateModal}
        ></CreateItemForm>}
    </div>






    )
}
export default Item;
