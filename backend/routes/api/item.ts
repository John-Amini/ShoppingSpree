import express from "express"
import asyncHandler from "express-async-handler"
import { handleValidationErrors } from "../../utils/validation"
import { setTokenCookie , requireAuth } from "../../utils/auth"
import { LayoutService } from "../../layouts/LayoutService"
import { LayoutRepository } from "../../layouts/LayoutRepository"
import { json } from "sequelize/types"
import { ItemService } from "../../items/ItemService"
import { ItemRepository } from "../../items/ItemRepository"
export const router = express.Router();

router.post("/:layoutId",requireAuth,asyncHandler(async (req,res) => {
    console.log("in create Item")
    // const userId = req.user.dataValues.id
    const {layoutId} = req.params
    console.log(layoutId)
    const name = req.body.name
    const weight = req.body.weight
    const itemService  = new ItemService(new ItemRepository())
    const item  = await itemService.createItem(layoutId,name,weight)
    return res.json(item)
}))

router.get("/:layoutId",requireAuth,asyncHandler(async(req,res)=>{
    console.log("Get Items associated with layout")
    const {layoutId} = req.params
    const itemService  = new ItemService(new ItemRepository())
    const items = await itemService.getItems(layoutId)
    return res.json(items)
}))





export default router
