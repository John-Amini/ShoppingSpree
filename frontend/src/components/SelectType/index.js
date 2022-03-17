const SelectType = (props) => {
    let setCurrPointer = props.setCurrPointer;
    function change(e){
        setCurrPointer(e.target.value)
    }
    return (
        <select onChange={(e) => change(e)}>
            <option value={"none"}>None</option>
            <option value={"start"}>start</option>
            <option value={"end"}>end</option>
            <option value={"wall"}>wall</option>
            <option value={"item1"}>Item</option>
        </select>
    )
}
export default SelectType
