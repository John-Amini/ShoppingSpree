import db from "../db/models"
import { Item } from "./types"

export class ItemRepository {
    ItemConn = db.Item;
    constructor(){}
    public async createItem(layoutId:number,name:string,weight:number) :Promise<Item>{
        const item = await this.ItemConn.create({
            layoutId,name,weight
        })
        return await this.ItemConn.findByPk(item.id)
    }
    public async getItems(layoutId:number) : Promise<Array<Item>>{
        const items = await this.ItemConn.findAll({
            where:{
                layoutId
            }
        })
        return items;
    }
}
