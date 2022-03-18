import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LayoutList = () => {
    let user = useSelector(state.session.user)
    const dispatch = useDispatch()
    const changeSelectedLayout = () => {

    }
    return (

    <select onChange={(e) => changeSelectedLayout(e)}>
            <option value={"default"}>Default</option>
            {/* do a map through the users layouts and assign value = to their primary key? */}
            <option value={"1"}>Layout 1</option>
            <option value={"2"}>Layout 2</option>
            <option value={"3"}>Layout 3</option>
            <option value={"4"}>Layout 4</option>
        </select>

    )
}
