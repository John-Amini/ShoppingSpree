import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, loadItems } from "../../store/item";
import EditItemForm from "./EditItemForm";
import './itemlist.css'
const ItemList = ({removeFromGrid,editOnGrid}) => {
    const layout = useSelector(state => state.layouts)
    const items = useSelector(state => state.items)
    const [showEditItemModal,setShowEditItemModal] = useState(false)
    const dispatch = useDispatch();
    useEffect( async () => {
        console.log("in use effect to load items")
        console.log(layout)
        if(layout?.currLayout)
            await dispatch(loadItems(layout?.currLayout.id))
    },[layout?.currLayout])

    let editForm;
    const toggleModal = e => setShowEditItemModal(true)
    const handleDelete = async (item) => {
        console.log(item)
        await dispatch(deleteItem(item.id))
        await removeFromGrid(item.id);
    }
    return <div className="wrapper"><div className="itemListContainer">
    <div>
    Start
    </div>
    <div>
    End
    </div>
    <div>
        Wall
    </div>
    {items.items && items.items.map( (item) => <div onMouseOver={(e) => {e.target.style.setProperty("background-color",item.color)}}
    onMouseLeave={(e) => {e.target.style.removeProperty("background-color")}}
    className="indiItem"> {item.name}

    <EditItemForm
        item={item}
        editOnGrid={editOnGrid}
        ></EditItemForm>
    <button className="deleteItem" onClick={async (e) => handleDelete(item)}>Delete Item</button>
    </div>)}
    </div>
    </div>
}

export default ItemList;
