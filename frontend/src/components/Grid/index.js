import { useEffect, useState } from "react"
import Point from "../Point";
import "./grid.css"
// use  context provider to determine what ill be clicking?
const Grid = () =>{
    let rows = 30
    let columns = 50

    const [grid,setGrid] = useState([]);

    useEffect( () => {
        //when trying to map over the 2d array if the values are empty it doesn actually do anything but itll if I add things
        let newGrid = []
        // for (let i  = 0 ;  i < 10;i++){
        //     newGrid[i] = new Array(10)
        //     newGrid[i][0] = 1
        //     newGrid[i][1] = 2
        //     newGrid[i][2] = 3
        //     newGrid[i][3] = 4
        //     newGrid[i][4] = 5
        //     newGrid[i][5] = 6
        //     newGrid[i][6] = 7
        //     newGrid[i][7] = 8
        //     newGrid[i][8] = 9
        //     newGrid[i][9] = 10
        // }
        for(let i = 0 ; i < rows ; i++){
            let currRow = [];
            for(let j = 0 ; j < columns ; j++){
                currRow.push(undefined)
            }
            newGrid.push(currRow)
        }
        setGrid(newGrid)

    },[])
    return <div className="grid">
    {grid.map((currRow,currRowIndex) => {
        // return <Point x={1}></Point>
        return <div className="column" key={currRowIndex}>
        {currRow.map( (currColumn,currColumnIndex) => <Point x={currRowIndex} y={currColumnIndex} rows={rows} columns={columns}> </Point>)}
        </div>
    })}
     </div>
}

export default Grid
