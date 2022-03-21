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
export const updateItem = (itemId,name,weight) => async dispatch => {
    console.log("updateItem")
    let response = await csrfFetch(`/api/items/${itemId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name,weight})
    })
    if(response.ok){
        console.log("updateItem okay")
        let data = await response.json()
        await dispatch(editItemType(data));
        console.log(data);
        return data;
    } else{
        console.log("updateItem not okay")

    }
}

export const deleteItem = (itemId) => async dispatch => {
    console.log("deleteItem")
    let response = await csrfFetch(`/api/items/${itemId}`,{
        method:"DELETE",
    })
    if(response.ok){
        console.log("deleteItem okay")
        let data = await response.json();
        console.log(data)
        await dispatch(deleteItemType(data))
        return data
    } else{
        console.log("deleteItem not okay")
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
        case EDIT_ITEM:
            newState.items = state.items;
            for(let i = 0 ; i < newState.items.length;i++){
                if(newState.items[i].id === action.payload.id) newState.items[i] =action.payload
            }
            return newState;
        case DELETE_ITEM:
            console.log("in delete Reducers")
            newState.items = state.items
            console.log("before for")
            console.log(newState)
            for(let i = 0 ; i < newState.items.length;i++){
                console.log("in for")
                console.log(action.payload)
                console.log(action.payload.id)
                if(newState.items[i].id === action.payload.id)
                {   console.log("in if")
                    newState.items.splice(i,1)
                    break;
                }
            }
            console.log("before return ")
            console.log(newState)
            return newState
        default:return state
    }
}

export default itemReducer
