import autoBind from "auto-bind";
import { ItemRepository } from "./ItemRepository";
import { Item } from "./types";
export class ItemService{
    constructor(private itemRepo: ItemRepository){
        autoBind(this)
    }
    public async createItem(layoutId:number,name:string,weight:number):Promise<Item>{
        const item = await this.itemRepo.createItem(layoutId,name,weight)
        return item;
    }
    public async getItems (layoutId:number):Promise<Array<Item>> {
        const items = await this.itemRepo.getItems(layoutId);
        return items
    }
}
