const SAVE_LAYOUT = "/layout/saveLayout"
const UPDATE_LAYOUT = "layout/updateLayout"
const DELETE_LAYOUT = "/layout/deleteLayout"
export const saveCurrentLayout = (grid) => async dispatch => {
    console.log("hitting save current layout")
    console.log(grid)

}

let initialState ={
    currLayout:null,
    layoutList:null
}
const layoutReducer = (state = initialState,action) => {
    let newState = {}
    switch (action.type){
        case SAVE_LAYOUT:
            console.log("hitting save layout reducer")
    }
}
export default layoutReducer
