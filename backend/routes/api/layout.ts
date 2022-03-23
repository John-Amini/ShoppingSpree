import express from "express"
import asyncHandler from "express-async-handler"
import { handleValidationErrors } from "../../utils/validation"
import { setTokenCookie , requireAuth } from "../../utils/auth"
import { LayoutService } from "../../layouts/LayoutService"
import { LayoutRepository } from "../../layouts/LayoutRepository"
import { json } from "sequelize/types"

export const router = express.Router();

router.get('/' ,requireAuth,asyncHandler(async (req,res) => {
    const userId = req.user.dataValues.id
    console.log("hitting get for ALL layouts ")
    const layoutService  = new LayoutService(new LayoutRepository())
    const layouts = await layoutService.getLayouts(userId)
    console.log(layouts)
   return res.json(layouts)
}))

router.get('/:id',requireAuth,asyncHandler(async (req,res) => {
    console.log("hitting get individual layout")
    const {id} = req.params;
    const layoutService  = new LayoutService(new LayoutRepository())
    const layout = await layoutService.getOneLayout(id)
    return res.json(layout)
}))

router.post('/' ,requireAuth, asyncHandler(async(req,res) => {
    console.log(req.user.dataValues.id)
    console.log(req.body.name)
    console.log("hitting post for layout for create new")
    const layoutService = new LayoutService(new LayoutRepository());
    if(await layoutService.checkIfNameExists(req.body.name,req.user.dataValues.id)){
        //exists error
        return res.json({error:"Layout already exists"})

    }
    const layout = await layoutService.makeDefault(req.user.dataValues.id,req.body.name)
    return res.json(layout)
})
)


router.put('/:id',requireAuth,asyncHandler(async (req,res) => {
    console.log(req.user.dataValues.id)
    console.log("hitting edit for layout for save")
    console.log(req.body.grid)
    const {id} = req.params
    let layoutService = new LayoutService(new LayoutRepository())
    const layout = await layoutService.saveLayout(id,req.body.grid,)
    return res.json(layout)
}))

router.delete('/:id' , requireAuth,asyncHandler(async (req,res) => {
    console.log(req.user.dataValues.id)
    console.log("hitting delete for layout")
    const {id} = req.params
    let layoutService = new LayoutService(new LayoutRepository())
    if(await layoutService.checkIfLastOne(req.user.dataValues.id)){
        return res.json({errors:"Cannot Delete last layout"})
    }
    const layout = await layoutService.deleteLayout(id)
    return res.json(layout)
}))
export default router
