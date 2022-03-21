import { useSelector } from "react-redux";

const SelectType = (props) => {
    let setCurrPointer = props.setCurrPointer;
    const items = useSelector(state => state.items)
    function change(e){
        setCurrPointer(e.target.value)
    }
    return (
        <select onChange={(e) => change(e)}>
            <option value={"none"}>None</option>
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
