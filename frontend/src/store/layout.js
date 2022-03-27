import { csrfFetch } from "./csrf"

const LOAD_LAYOUTS = "/layout/loadLayouts"
const LOAD_ONE_LAYOUT = "/layout/loadOneLayout"
const SAVE_LAYOUT = "/layout/saveLayout"
const CREATE_LAYOUT = "/layout/createLayout"
const UPDATE_LAYOUT = "layout/updateLayout"
const DELETE_LAYOUT = "/layout/deleteLayout"
const EDIT_NAME = "/layout/editName"
const getLayoutMatrix = async (layout) => {
    return await JSON.parse(layout);
}
const editNameType = layout => ({
    type:EDIT_NAME,
    payload:layout
})
const deleteLayoutType = layoutId => ({
    type:DELETE_LAYOUT,
    payload:layoutId
})
const createLayoutType = layout => ({
    type:CREATE_LAYOUT,
    payload:layout
})
const loadLayoutsType = layouts => ({
    type:LOAD_LAYOUTS,
    payload:layouts
})

const loadOneLayoutType = layout => ( {
    type:LOAD_ONE_LAYOUT,
    payload:layout
})

const saveLayoutType = layout => ( {
    type:SAVE_LAYOUT,
    payload:layout
})
export const createNewLayout = (name) => async dispatch =>{
    // console.log("are we in create new")
    let response = await csrfFetch("/api/layouts/",{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({name})
    })
    if(response.ok){
        // console.log("response is okay asddsasdads")
        let data = await response.json()
        if(data.error){
            // console.log("error is bad")
            return data
        }
        // console.log(data)
        await dispatch(createLayoutType(data))
        await dispatch(LoadOneLayout(data.id))
        return {}
    } else{

    }
}
export const editNameOfLayout = (name,layoutId,originalName) => async dispatch => {
    // console.log("editNameOfLayout")
    let response = await csrfFetch(`/api/layouts/name/${layoutId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({name,originalName})
    })
        if(response.ok){
            // console.log("editNameOfLayout Response Okay")
            let data = await response.json();
            if(data.error) return data
            await dispatch(editNameType(data))
            return data
        }
}
export const saveCurrentLayout = (grid,layoutId) => async dispatch => {
    // console.log("hitting save current layout")
    // console.log(grid)
    let response = await csrfFetch(`/api/layouts/${layoutId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({grid})
    })
    if(response.ok){
        // console.log("okay response from save")
        let data = await response.json()
        let layoutMatrix = await JSON.parse(data.layout)
        data.layout = layoutMatrix;
        await dispatch(saveLayoutType(data));
    } else {
        // console.log("bad return from save")
    }
}

export const deleteLayout = (layoutId) => async dispatch => {
    // console.log("hitting deleteLayout")
    let response = await csrfFetch(`/api/layouts/${layoutId}`,{
        method:"DELETE",
    })
    if(response.ok){
        // console.log("deleteLayout Okay")
        let data = await response.json();
        if(data.errors){
            // console.log("it errored")
            return data
        }
        await dispatch(deleteLayoutType(data.id))
        return data
    }
        else{
            // console.log("deleteLayout Not Okay")
        }
}
export const LoadOneLayout = (layoutId) => async dispatch => {
    // console.log("hitting load one")
    let response = await fetch(`/api/layouts/${layoutId}`)
    if(response.ok) {
        // console.log("htting good response on return for load 1")
        let data = await response.json()
        // console.log(data)
        // console.log(data.id)
        // console.log(data.layout)
        let layoutMatrix = await JSON.parse(data.layout);
        data.layout = layoutMatrix;
        // console.log(data)
        await dispatch(loadOneLayoutType(data))
    } else{
        // console.log("hitting bad response on load one")
    }
}

export const loadLayouts = () => async dispatch => {
    // console.log("hitting load layouts for list")
    let response = await fetch('/api/layouts/')
    if(response.ok){
        let data = await response.json()
        // console.log(data)
        // console.log(data[0])
        // console.log(data[0].id)
        await dispatch(loadLayoutsType(data))
        await dispatch(LoadOneLayout(data[0].id))
    } else{
        //error
    }
}


function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }


export const getOptimalPath = (grid) => async dispatch => {
    // console.log("getOptimalPath")
    let response = await csrfFetch('/api/layouts/optimize',{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({grid})
    })
    if(response.ok){
        let data = await response.json()
        return data
    }
}

let initialState ={
    currLayout:null,
    layoutList:null
}
const layoutReducer = (state = initialState,action) => {
    let newState = {}
    let layout;
    switch (action.type){
        case SAVE_LAYOUT:
            // console.log("IN SAVE REDUCERE")
            newState.layoutList = state.layoutList;
            newState.currLayout = action.payload
           return newState
        case LOAD_LAYOUTS:
            // console.log("hitting load layouts Reducer")
            newState.layoutList = action.payload
            return newState
        case LOAD_ONE_LAYOUT:
            // console.log("hitting load one layour reducer")
            newState.layoutList = state.layoutList;
            newState.currLayout = action.payload;
            return newState
        case CREATE_LAYOUT:
            newState.layoutList = state.layoutList;
            newState.layoutList.unshift(action.payload);
            return  newState
        case DELETE_LAYOUT:
            newState.layoutList = state.layoutList
            var index = newState.layoutList.findIndex(function (layout){
                return String(layout.id) == String(action.payload)
            })
            newState.layoutList.splice(index,1)
            return newState
        case EDIT_NAME:
            // console.log("in edit name Reducer")
            newState.layoutList = state.layoutList
            var index = newState.layoutList.findIndex(function (layout){
                return String(layout.id) == String(action.payload.id)
            })
            newState.layoutList[index].name = action.payload.name
            newState.currLayout = state.currLayout;
            newState.currLayout.name = action.payload.name
            return newState
        default: return state
        }
}
export default layoutReducer
