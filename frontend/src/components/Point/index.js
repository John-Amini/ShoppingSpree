const Point = (props) => {
    let x = props.x
    let y = props.y
    let rows = props.rows
    let columns = props.columns
    return <div className={"point"}onClick={() => {
        console.log(x)
        console.log(y)
    }}></div>
}

export default Point
