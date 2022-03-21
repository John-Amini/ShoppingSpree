import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteLayout, loadLayouts, LoadOneLayout, saveCurrentLayout } from "../../store/layout";
import Point from "../Point";
import CreateLayoutForm from "./CreateNewLayoutForm";
import Item from "../Item";
import "./grid.css"
import SelectLayoutList from "./selectLayoutList";
// use  context provider to determine what ill be clicking?
const Grid = (props) =>{
    let rows = 30
    let columns = 62
    const start = "start"
    const end = "end"
    let dispatch = useDispatch()
    const [grid,setGrid] = useState([]);
    const [isMouseDown,setIsMouseDown] = useState(false)
    const [random,setRandom] = useState(true)
    const [showModal, setShowModal] = useState(false);
    let currPointer = props.currPointer;
    const sessionUser = useSelector(state => state.session.user);
    let currLayout =useSelector (state => state.layouts.currLayout)
    let layoutList = useSelector(state => state.layouts.layoutList)
    let [name,setName] = useState('')
    useEffect( () => {
        if(currLayout)
        setName(currLayout.name)
    },[currLayout])
    const toggleCreateWatchlistForm = async e => {
        setShowModal(true);
      };
    const copyCurrLayoutGridToGrid = () => {
        console.log("in Copy currLayout")
        if(!currLayout) return
        console.log("copying curr layout")
        let newGrid = []
        for(let i = 0 ; i < rows ; i++){
            let currRow = [];
            for(let j = 0 ; j < columns ; j++){
                currRow.push({
                    row:i,
                    column:j,
                    type: currLayout.layout[i][j].type
                })
            }
            newGrid.push(currRow)
        }
        setGrid(newGrid)
    }
    const handleOnClear = () => {
        let newGrid = clearGrid()
        setGrid(newGrid)
    }
    function clearGrid(){
        let newGrid = []
        for(let i = 0 ; i < rows ; i++){
            let currRow = [];
            for(let j = 0 ; j < columns ; j++){
                currRow.push({
                    row:i,
                    column:j,
                    type:"none"
                })
            }
            newGrid.push(currRow)
        }
        return newGrid;
    }
    useEffect( () => {
        let newGrid = clearGrid();
        setGrid(newGrid)
        copyCurrLayoutGridToGrid()

    },[currLayout])
    function mouseDown(row,col,e,type){
        let newGrid = handleChange(row,col,grid);
        setGrid(newGrid)
        setIsMouseDown(true)

        return currPointer
    }
    function mouseEnter(row,col,e,type){
        if (isMouseDown && currPointer!== start && currPointer!== end){
        let newGrid = handleChange(row,col,grid)

        // console.log("Adding css class to" ,row,col)
        // e.target.classList.remove("none","wall","start","end")
        // e.target.classList.add(type)
        setRandom(!random)
        setGrid(newGrid)


        return currPointer
        }
    }
    function mouseUp(row,col){
        setIsMouseDown(false)
    }

    function handleChange(row,col,grid){
        let newGrid = grid;
        if(newGrid[row][col].type === null || newGrid[row][col].type !== currPointer){
            if(currPointer === 'start' || currPointer === 'end'){
                resetStartInGrid();
            }
            newGrid[row][col].type = currPointer
        }
         else if(newGrid[row][col].type === currPointer){
            newGrid[row][col].type = 'none'
         }
         return newGrid
    }
    function resetStartInGrid(){
        for(let i = 0 ; i < rows ; i++ ){
            for (let j = 0 ; j < columns;j++){
                if(grid[i][j].type === currPointer ) grid[i][j].type = "none"
            }
        }
    }
    async function handleSaveLayout(e){
        await dispatch(saveCurrentLayout(grid,currLayout.id))
    }
    function handleNameChange(e){
        setName(e.target.value)
    }
    async function handleDelete(e){
        await dispatch(deleteLayout(currLayout.id))
        await dispatch(LoadOneLayout(layoutList[0].id))
    }
    return <div>
        <SelectLayoutList></SelectLayoutList>
        <button onClick={ async (e)=>{
            handleSaveLayout(e)
        }}> Save Layout </button>

        {/* {currLayout &&
        <span contenteditable="true"
        onChange={(e) => {
            handleNameChange(e)
        }}>
            {name} </span>} */}
        {currLayout && currLayout.name}
        <button>Edit name</button>
        <button onClick={handleOnClear}>Clear Layout</button>
        <button onClick={(e) => handleDelete(e)}>Delete Layout</button>
        <button onClick={toggleCreateWatchlistForm}>Create New</button>
        {showModal && <CreateLayoutForm setShowModal={setShowModal} showModal={showModal}></CreateLayoutForm>}
        <Item></Item>
    <div className="grid">
    {grid.map((currRow,currRowIndex) => {
        // return <Point x={1}></Point>
        return <div className="column" key={`${currRowIndex} column`}>
        {currRow.map( (currColumn,currColumnIndex) => <Point
        key={`${currRowIndex} ${currColumnIndex} point`}
         x={currRowIndex}
         y={currColumnIndex}
         type={grid[currRowIndex][currColumnIndex].type}
         rows={rows}
         columns={columns}
         currPointer={currPointer}
         mouseDown={mouseDown}
         mouseEnter={mouseEnter}
         mouseUp={mouseUp}
         onMouseDown={() => {props.mouseDown(currRowIndex,currColumnIndex)
         }}
         onMouseEnter={(e)=> {props.mouseEnter(currRowIndex,currColumnIndex)}}
         onMouseUp={(e)=>{props.mouseUp(currRowIndex,currColumnIndex)
         }}
         > </Point>)}
        </div>
    })}
     </div>
     </div>
}

export default Grid
