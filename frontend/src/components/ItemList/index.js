import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadItems } from "../../store/item";
import './itemlist.css'
const ItemList = () => {
    const layout = useSelector(state => state.layouts)
    const items = useSelector(state => state.items)
    if (items)
        console.log(items.items)
    const dispatch = useDispatch();
    useEffect( async () => {
        console.log("in use effect to load items")
        console.log(layout)
        if(layout?.currLayout)
            await dispatch(loadItems(layout?.currLayout.id))
    },[layout?.currLayout])
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
    {items.items && items.items.map( (item) => <div> {item.name}
    <button> Edit Item</button>
    <button>Delete Item</button>
    </div>)}
    </div>
    </div>
}

export default ItemList;
