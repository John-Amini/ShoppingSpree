import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoadOneLayout } from "../../../store/layout"
const SelectLayoutList = (props) => {
    let layouts = useSelector(state => state.layouts)
    let layoutList = layouts.layoutList
    let setCurrPointer = props.setCurrPointer
    let dispatch = useDispatch()
    const handleChange = async (e) => {
        // console.log(e.target.value)
        await dispatch(LoadOneLayout(e.target.value))
        setCurrPointer("none")
        let select = document.getElementById("itemSelect")
        select.value = "none"
    }
    useEffect(() => {
        if(layouts.currLayout){
        let option = document.getElementById(`option${layouts.currLayout.id}`)
        option.selected = true;
    }
    },[layouts.currLayout])
    return <select onChange={(e) => handleChange(e) }>
        {layoutList && layoutList.map( (layout) => {

            return <option id={`option${layout.id}`}value={layout.id}>{layout.name}
            </option>
        })}
        </select>

}

export default SelectLayoutList
