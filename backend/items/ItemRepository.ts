import db from "../db/models"
import { Item } from "./types"

export class ItemRepository {
    ItemConn = db.Item;
    constructor(){}
    public async createItem(layoutId:number,name:string,weight:number,color:string) :Promise<Item>{
        const item = await this.ItemConn.create({
            layoutId,name,weight,color
        })
        return await this.ItemConn.findByPk(item.id)
    }
    public async getItems(layoutId:number) : Promise<Array<Item>>{
        const items = await this.ItemConn.findAll({
            where:{
                layoutId
            },
            order: [['createdAt', 'ASC']],
        })
        return items;
    }
    public async updateItem (itemId:number,name:string, weight:number , color:string): Promise<Item>{
        const item = await this.ItemConn.update({
            name,weight,color
        },
        {where:{id:itemId}})
        return this.ItemConn.findByPk(itemId);
    }

    public async deleteItem(itemId:number):Promise<Item>{
        const item = await this.ItemConn.findByPk(itemId)
        await item.destroy();
        return item;
    }

    public async checkIfNameExists(name:string,layoutId:number):Promise<Boolean>{
        let exists = await this.ItemConn.findAll({
            where:{layoutId,
            name:name
            }
        })
        if(exists.length === 0) return false;
        return true;
    }
    public async getLayoutIdOfItem(itemId:number):Promise<number>{
        let item = await this.ItemConn.findByPk(itemId);
        return item.layoutId
    }
}
