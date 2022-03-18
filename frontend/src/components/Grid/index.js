import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { saveCurrentLayout } from "../../store/layout";
import Point from "../Point";
import CreateLayoutForm from "./CreateNewLayoutForm";
import Item from "../Item";
import "./grid.css"
// use  context provider to determine what ill be clicking?
const Grid = (props) =>{
    let start = "start"
    let end = "end"
    let rows = 30
    let dispatch = useDispatch()
    let columns = 62
    const [grid,setGrid] = useState([]);
    const [isMouseDown,setIsMouseDown] = useState(false)
    const [random,setRandom] = useState(true)
    const [showModal, setShowModal] = useState(false);
    let currPointer = props.currPointer;

    const toggleCreateWatchlistForm = async e => {
        setShowModal(true);
      };

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

    },[])
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
            newGrid[row][col].type = null
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
        await dispatch(saveCurrentLayout(grid))
    }
    return <div>
        <button onClick={ async (e)=>{
            handleSaveLayout(e)
        }}> Save Layout </button>

        {"LAYOUT NAME HERE OR PLACEHOLDER"}
            <button>Edit name</button>
            <button onClick={handleOnClear}>Clear Layout</button>
        <button>Delete Layout</button>
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
