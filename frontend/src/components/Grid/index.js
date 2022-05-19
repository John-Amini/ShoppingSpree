import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteLayout, getOptimalPath, loadLayouts, LoadOneLayout, saveCurrentLayout } from "../../store/layout";
import SelectType from "../SelectType";
import Point from "../Point";
import CreateLayoutForm from "./CreateNewLayoutForm";
import Item from "../Item";
import "./grid.css"
import SelectLayoutList from "./selectLayoutList";
import { Modal2 } from "./CreateNewLayoutForm/context/Modal";
import EditLayoutForm from "./EditLayoutForm";
import Tutorial from "../tutorial";
// use  context provider to determine what ill be clicking?
const Grid = (props) =>{
    let rows = 30
    let columns = 62

    // console.log("rerender grid")
    let dispatch = useDispatch()
    const [grid,setGrid] = useState([]);
    const [isMouseDown,setIsMouseDown] = useState(false)
    const [random,setRandom] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [currPointer,setCurrPointer] = useState('none')
    // let currPointer = props.currPointer;
    // let setCurrPointer = props.setCurrPointer;
    let currLayout =useSelector (state => state.layouts.currLayout)
    let layoutList = useSelector(state => state.layouts.layoutList)
    let items = useSelector(state=>state.items)
    let [name,setName] = useState('')
    const [errors,setErrors] = useState([])
    const [showErrorModal,setShowErrorModal] = useState(false)
    const [showEditModal,setShowEditModal] = useState(false)
    const [originalGrid,setOriginalGrid] = useState(null)
    const [tutorialModal,setTutorialModal] = useState(false)
    useEffect(async () => {
        await dispatch(loadLayouts())
    },[])
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
        // console.log("in Copy currLayout")
        if(!currLayout) return
        // console.log("copying curr layout")
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
    const handleOnClear = async () => {
        let newGrid = clearGrid()
        setGrid(newGrid);
        await dispatch(saveCurrentLayout(newGrid,currLayout.id))
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
        if (isMouseDown && (currPointer === "wall" || currPointer === 'none')){
        let newGrid = handleChange(row,col,grid)

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
            if(currPointer !== "wall" && currPointer !== 'none'){
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
        let saved = document.getElementById("saved")
        saved.classList.remove("hide")
        setTimeout(
        () => {
            saved.classList.add("hide")
        }
,1000
        )
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
        setCurrPointer("none")
        let select = document.getElementById("itemSelect")
        select.value = "none"
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
    async function handleOptimize(e){
        await dispatch(saveCurrentLayout(grid,currLayout.id))
        let gridBefore = JSON.parse(JSON.stringify(grid))
        document.body.className = "testClass"
      let result = await dispatch(getOptimalPath(grid))
      if(result.path){
        //success

        let prevColor = "#FFA500"
        let color = "#FFA500"
        for(let i = 0 ; i < result.path.length;i++){
            // console.log(point)
            let point  = result.path[i]
            let row = point.x;
            let column = point.y

            setTimeout(() => {
                let newGrid = grid.slice()
                let pointOnGrid = newGrid[row][column];
                if(pointOnGrid.type === "end"){
                //   document.body.className = "testClass"
                  setOriginalGrid(gridBefore)
                }
                if(pointOnGrid.color && pointOnGrid.solution !== true || pointOnGrid.type === 'end'){
                    color = pointOnGrid.color
                }
                pointOnGrid.color = color;
                if(pointOnGrid.type === 'none'){
                    pointOnGrid.solution = true;
                }
                setGrid(newGrid)
            },60*i)
            //was 60
            //prev === color at the start
             // => each none doesnt matter set that to current color
             // => go to item or end color is now something different change prev color to color
        //     if(newGrid[row][column].type === 'none'){
        //         setTimeout(() => {
        //             //prev color and color arent changed before going into this for some reason
        //             let testColor = color
        //             let newGrid = grid.slice()
        //             newGrid[row][column].solution = true
        //             newGrid[row][column].color = testColor
        //             setGrid(newGrid)
        //     },100 * i)

        // }
        //  else if(newGrid[row][column].type !== 'start' && newGrid[row][column].type !== 'end'){
        //     console.log("in else")

        //     console.log(newGrid[row][column].type)
        //     // let temp = color;
        //     color = newGrid[row][column].color
        //     // prevColor = temp
        //     // console.log(`prev color is `,prevColor)
        //     console.log("color is",color)
        // }




    }

      }
      else if(result.error){
        setOriginalGrid(null)
        document.body.classList.remove("testClass")
        setErrors(result.error)
        setShowErrorModal(true)

      }
    }


    function handleReset (){
        document.body.classList.remove("testClass")
        setGrid(originalGrid);
        setOriginalGrid(null)
    }

    const toggleTutorial = () => {
        setTutorialModal(true)
    }


    return <div>
        {tutorialModal && <Tutorial showModal={tutorialModal} setShowModal = {setTutorialModal}></Tutorial>}
        {showErrorModal && <Modal2 title={`Errors`}
        onClose={ () => setShowErrorModal(false) }
        show={showErrorModal}
        >
            {errors}
            </Modal2>}
            <div className="selectDivs">

            <div className="containerForSelect">
                <label className="label">Select Layout:</label>
        <SelectLayoutList setCurrPointer={setCurrPointer}></SelectLayoutList>
        <button className={"newLayoutButton create"}onClick={toggleShowModal}>New Layout</button>
        <button className="tutorialButton" onClick={ () => toggleTutorial()}>See tutorial</button>
        </div>
            <div className="selectTypeWrapper containerForSelect"> <label className="label" >Select Option:</label>
            <SelectType setCurrPointer = {setCurrPointer} currPointer={currPointer}></SelectType>
            </div>

            </div>
            <div className="layoutOptionsContainer">
        <div className="saveButtonContainer">
        <button className={"saveSubmit"}onClick={ async (e)=>{
            handleSaveLayout(e)
        }}> Save Layout </button>
        <div id="saved" className="saved hide">Layout Saved</div>
        </div>
        <button className="delete" onClick={(e) => handleDelete(e)}>Delete Layout</button>


        <button className={"edit"}onClick={ toggleShowEditModal }>Edit Name</button>
        <button className={"clear"}onClick={handleOnClear}>Clear Layout</button>
        <div className="optimizeResetContainer">
        { !originalGrid && <button className="optimize" onClick={(e) => handleOptimize(e)}>Optimize!</button> }
        {originalGrid && <button className = {"pointerYes"}onClick={(e) => {handleReset()}}>Reset Grid </button>}

        </div>
        </div>
        <div className="layoutName">
        {currLayout && currLayout.name}
        </div>


        <Item currPointer={currPointer} setCurrPointer={setCurrPointer} removeFromGrid={removeFromGrid} editOnGrid={editOnGrid}></Item>

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
     {showEditModal && <EditLayoutForm showModal={showEditModal}
        setShowModal={setShowEditModal}
        currLayout = {currLayout}
        ></EditLayoutForm>}
        {showModal && <CreateLayoutForm setCurrPointer={setCurrPointer} setShowModal={setShowModal} showModal={showModal}></CreateLayoutForm>}
     </div>
}

export default Grid
