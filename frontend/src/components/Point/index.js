import { useState } from 'react'
import './point.css'
const Point = (props) => {
    let x = props.x
    let y = props.y
    let rows = props.rows
    let columns = props.columns
    let type = props.type !== undefined ? props.type : "none"
    let color = props.color !== undefined ? props.color: ""
    return <div
    style={{backgroundColor: color}}
    onMouseDown={(e) => { props.mouseDown(x,y,e,type)

    }}
    onMouseEnter={(e)=> {props.mouseEnter(x,y,e,type)}}
    onMouseUp={(e)=>{props.mouseUp(x,y)
    }}
    className={`point ${type}` }
    onClick={(e) => {

    }}></div>
}

export default Point
