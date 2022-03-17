import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { saveCurrentLayout } from "../../store/layout";
import Point from "../Point";
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
    let currPointer = props.currPointer;
    useEffect( () => {
        let newGrid = []
        for(let i = 0 ; i < rows ; i++){
            let currRow = [];
            for(let j = 0 ; j < columns ; j++){
                currRow.push({
                    row:i,
                    column:j,
                    type:null
                })
            }
            newGrid.push(currRow)
        }
        setGrid(newGrid)

    },[])
    function mouseDown(row,col,e,type){
        let newGrid = handleChange(row,col,grid);

        // console.log("Adding css class to" ,row,col)
        // e.target.classList.remove("none","wall","start","end")
        // e.target.classList.add(type)
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
            newGrid[row][col].type = currPointer
        }
         else if(newGrid[row][col].type === currPointer){
            newGrid[row][col].type = null
         }
         return newGrid
    }

    async function handleSaveLayout(e){
        await dispatch(saveCurrentLayout(grid))
    }
    return <div>
        <button onClick={ async (e)=>{
            handleSaveLayout(e)
        }}> Save Layout </button>
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
