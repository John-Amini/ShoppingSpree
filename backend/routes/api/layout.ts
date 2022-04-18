import express from "express"
import asyncHandler from "express-async-handler"
import { handleValidationErrors } from "../../utils/validation"
import { setTokenCookie , requireAuth } from "../../utils/auth"
import { LayoutService } from "../../layouts/LayoutService"
import { LayoutRepository } from "../../layouts/LayoutRepository"
import { json } from "sequelize/types"
import { GenerateGraph, GetAllPaths } from "../../utils/bfs"
import { BruteForce } from "../../utils/BruteForce"
import { createPath } from "../../utils/createPath"
import { ItemService } from "../../items/ItemService"
import { ItemRepository } from "../../items/ItemRepository"
import { branchAndBound } from "../../utils/branchAndBound"

export const router = express.Router();

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }


function replacer(key, value) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }


router.post('/optimize',requireAuth,asyncHandler(async (req,res)=> {
    console.log("Optimize")
    try{
    let graph = GenerateGraph(req.body.grid);

    branchAndBound(graph);
    let getAllPaths = GetAllPaths(req.body.grid)
    let solution = BruteForce(graph)
    let testReplacer = JSON.stringify(graph,replacer)
    // console.log(json)
    // console.log(solution)
    let path = createPath(getAllPaths,solution)
    return res.json({solution,testReplacer,getAllPaths,path})
    } catch(e){
        let errorMessage = getErrorMessage(e);
        // if(errorMessage.includes(":")){
        //    let split = errorMessage.split(':');
        //     let id = parseInt(split[1]);
        //     const itemService = new ItemService(new ItemRepository())
        //     const item = await itemService.getOneItem(id);
        //     errorMessage = `${item.name} cannot reach all points`
        // }
        return res.json({error:errorMessage})
    }
}))

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
router.put ('/name/:layoutId',requireAuth,asyncHandler(async(req,res) => {
    console.log("hitting edit for name")
    const {layoutId} = req.params;
    const name = req.body.name
    const originalName = req.body.originalName
    if(name === originalName){
        return res.json({error:"Same as Original name"})
    }
    let layoutService = new LayoutService(new LayoutRepository());
    if(await layoutService.checkIfNameExists(name,req.user.dataValues.id)){
        //exists error
        return res.json({error:"Layout already exists"})

    }
    const layout = await layoutService.updataName(name,layoutId)
    return res.json(layout)
}))
router.put('/:id',requireAuth,asyncHandler(async (req,res) => {
    console.log(req.user.dataValues.id)
    console.log("hitting edit for layout for save")
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
