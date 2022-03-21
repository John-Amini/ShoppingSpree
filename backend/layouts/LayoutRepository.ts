import db from "../db/models"
import { Layout, LayoutWithoutLayout } from "./types";
export class LayoutRepository{
    LayoutConn = db.Layout;
    rows = 30
    columns = 62
    listOfColumns = ['id', 'userId','name','createdAt','updatedAt']
    constructor() {
    }
    public async createDefault(userId:number,name="default"): Promise<Layout>{
        let defaultLayout = this.makeEmptyGrid();
        let jsonStringLayout = JSON.stringify(defaultLayout)
        const layout = await this.LayoutConn.create({
            userId,
            name:name,
            layout:jsonStringLayout
        })
        return await this.LayoutConn.findByPk(layout.id)
    }
    public async deleteLayout(layoutId): Promise<Layout>{
        let layout = await db.Layout.findByPk(layoutId);
        await layout.destroy();
        return layout
    }
    public async getLayoutsWithNoGrid (userId:number) : Promise<[LayoutWithoutLayout]>{
       const layouts = await db.Layout.findAll({
            attributes: this.listOfColumns,
            where:{
                userId:userId
            }
        })
        // console.log(layouts)
        // console.log(layouts[0].id)
        return layouts
    }

    public async getFullLayout (layoutId : number): Promise<Layout> {
        const layout = await db.Layout.findByPk(layoutId);
        return layout
    }

    public async saveLayoutEdit(id,grid) : Promise<Layout>{
        let jsonStringLayout = JSON.stringify(grid)

        const layout = await db.Layout.update(
             {layout:jsonStringLayout},
             {where: {id:id}}
             )
             console.log(layout)
             return await db.Layout.findByPk(id)
    }
// Object[][]
    public  makeEmptyGrid() : Array<Array<Object>> {
       let newGrid : Array<Array<Object>>
       newGrid = []
        for(let i = 0 ; i < this.rows ; i++){
            let currRow :Array<Object>;
            currRow = []
            for(let j = 0 ; j < this.columns ; j++){
                currRow.push({
                    row:i,
                    column:j,
                    type:"none"
                })
            }
            newGrid.push(currRow)
        }
        return newGrid

    }
}
