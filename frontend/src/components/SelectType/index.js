import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLayouts } from "../../store/layout";
import './select.css'
const SelectType = (props) => {
    let setCurrPointer = props.setCurrPointer;
    let dispatch = useDispatch()
    const items = useSelector(state => state.items)
    function change(e){
        setCurrPointer(e.target.value)
    }
    return (
        <select className="itemSelect" id={"itemSelect"} onChange={(e) => change(e)}>
            <option selected = "selected" id={'none'} value={"none"}>None</option>
            <option value={"start"}>start</option>
            <option value={"end"}>end</option>

            <option value={"wall"}>wall</option>
            {items.items && items.items.map((item) => {
                return <option value={item.id}> {item.name}</option>
            })}
        </select>
    )
}
export default SelectType


// need the amount of items
//
