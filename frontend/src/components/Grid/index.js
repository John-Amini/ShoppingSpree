import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteLayout, loadLayouts, LoadOneLayout, saveCurrentLayout } from "../../store/layout";
import Point from "../Point";
import CreateLayoutForm from "./CreateNewLayoutForm";
import Item from "../Item";
import "./grid.css"
import SelectLayoutList from "./selectLayoutList";
import { Modal2 } from "./CreateNewLayoutForm/context/Modal";
import EditLayoutForm from "./EditLayoutForm";
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
    let items = useSelector(state=>state.items)
    let [name,setName] = useState('')
    const [errors,setErrors] = useState([])
    const [showErrorModal,setShowErrorModal] = useState(false)
    const [showEditModal,setShowEditModal] = useState(false)
    useEffect( () => {
        if(currLayout)
        setName(currLayout.name)
    },[currLayout])
    const toggleShowModal = async e => {
        setShowModal(true);
      };
    const toggleShowEditModal = async e => {
          setShowEditModal(true)
      }
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
                    type: currLayout.layout[i][j].type,
                    color:currLayout.layout[i][j].color
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
        if (isMouseDown && currPointer === "wall"){
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
        if(newGrid[row][col].type === 'none' || newGrid[row][col].type !== currPointer){
            if(currPointer !== "wall"){
                resetStartInGrid();
            }
            newGrid[row][col].type = currPointer
            newGrid[row][col].color = ""
            if( !isNaN(currPointer)){
                //currPointer is an id
                if(items.items){
                    let item;
                    for(let i = 0 ; i < items.items.length;i++){
                        if(items.items[i].id == currPointer)
                        newGrid[row][col].color = items.items[i].color
                    }
                }
            }
        }
         else if(newGrid[row][col].type === currPointer){
            newGrid[row][col].type = 'none'
            newGrid[row][col].color = ""

         }
         return newGrid
    }
    function resetStartInGrid(){
        for(let i = 0 ; i < rows ; i++ ){
            for (let j = 0 ; j < columns;j++){
                if(grid[i][j].type === currPointer ) {
                    grid[i][j].type = "none"
                    grid[i][j].color = ""
                }
            }
        }
    }
    async function handleSaveLayout(e){
        await dispatch(saveCurrentLayout(grid,currLayout.id))
    }

    async function handleDelete(e){
        let errors = []
       let response = await dispatch(deleteLayout(currLayout.id))
        if(response.errors){
            errors.push(response.errors)
            setErrors(errors)
            setShowErrorModal(true)
        } else{
        await dispatch(LoadOneLayout(layoutList[0].id))
        }
    }

    async function removeFromGrid(itemId){
        let newGrid = JSON.parse(JSON.stringify(grid))
        for(let i = 0 ; i < rows ; i++){
            for(let j = 0 ; j < columns ; j++){
                if(newGrid[i][j].type === String(itemId)){
                delete newGrid[i][j].color
                newGrid[i][j].type = "none"
                }
            }
        }
        setGrid(newGrid);
        await dispatch(saveCurrentLayout(newGrid,currLayout.id))
    }
    async function editOnGrid(itemId,changedColor){
        for(let i = 0 ; i < rows ; i++){
            for(let j = 0 ; j < columns ; j++){
                if(grid[i][j].type === String(itemId)){
                grid[i][j].color = changedColor
                }
            }
        }
        await dispatch(saveCurrentLayout(grid,currLayout.id))
    }

    return <div>
        {showErrorModal && <Modal2 title={`Errors`}
        onClose={ () => setShowErrorModal(false) }
        show={showErrorModal}
        >
            {errors}
            </Modal2>}
        <SelectLayoutList></SelectLayoutList>
        <button onClick={ async (e)=>{
            handleSaveLayout(e)
        }}> Save Layout </button>
        {currLayout && currLayout.name}
        <button onClick={ toggleShowEditModal }>Edit name</button>
        <button onClick={handleOnClear}>Clear Layout</button>
        <button onClick={(e) => handleDelete(e)}>Delete Layout</button>
        <button onClick={toggleShowModal}>Create New</button>
        {showEditModal && <EditLayoutForm showModal={showEditModal}
        setShowModal={setShowEditModal}
        currLayout = {currLayout}
        ></EditLayoutForm>}
        {showModal && <CreateLayoutForm setShowModal={setShowModal} showModal={showModal}></CreateLayoutForm>}
        <Item removeFromGrid={removeFromGrid} editOnGrid={editOnGrid}></Item>
    <div className="grid">
    {grid.map((currRow,currRowIndex) => {
        return <div className="column" key={`${currRowIndex} column`}>
        {currRow.map( (currColumn,currColumnIndex) => <Point
        key={`${currRowIndex} ${currColumnIndex} point`}
         x={currRowIndex}
         y={currColumnIndex}
         type={grid[currRowIndex][currColumnIndex].type}
         color={grid[currRowIndex][currColumnIndex].color}
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
