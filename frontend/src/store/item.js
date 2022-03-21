import { csrfFetch } from "./csrf"

const CREATE_ITEM = 'items/create'
const DELETE_ITEM = 'items/delete'
const EDIT_ITEM = 'items/edit'
const LOAD_ITEMS = 'items/load'

const createItemType = item => ({
    type:CREATE_ITEM,
    payload:item
})

const deleteItemType = item => ({
    type:DELETE_ITEM,
    payload:item
})

const editItemType = item => ({
    type:EDIT_ITEM,
    payload:item
})
const loadItemsType = items => ({
    type:LOAD_ITEMS,
    payload:items
})

export const createItem = (name,layoutId,weight) => async dispatch => {
    console.log("createItem")
    let response = await csrfFetch(`/api/items/${layoutId}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name,weight})
    })

    if(response.ok){
        let data = await response.json();
        await dispatch(createItemType(data))
        return data
    }
    else{
        console.log("createItem not Okay")
    }
}
export const loadItems = (layoutId) => async dispatch => {
    console.log("loadItems")
    let response = await csrfFetch(`/api/items/${layoutId}`)
    if(response.ok){
        console.log("loadItems okay")
        let data = await response.json()
        await dispatch(loadItemsType(data))
    } else {
        console.log("loadItems bad")
    }
}
let initialState = {
    items: null,
}

const itemReducer = (state = initialState,action) => {
    let newState = {}
    switch(action.type){
        case LOAD_ITEMS:
            newState.items = action.payload
            return newState
        case CREATE_ITEM:
            newState.items = state.items
            newState.items.push(action.payload)
            return newState
        default:return state
    }
}

export default itemReducer
