import autoBind from "auto-bind";
import { LayoutRepository } from "./LayoutRepository";
import { Layout } from "./types";

export class LayoutService {
    constructor(private layoutRepo : LayoutRepository){
        autoBind(this)
    }
    public async makeDefault(userId:number,name="default"){
        const layout = await this.layoutRepo.createDefault(userId,name)
        return layout
    }
    public async getLayouts(userId:number){
        const layouts = await this.layoutRepo.getLayoutsWithNoGrid(userId)
        return layouts
    }
    public async getOneLayout(layoutId:number) :Promise<Layout> {
        const layout  = await this.layoutRepo.getFullLayout(layoutId)
        return layout
    }
    public async saveLayout(layoutId:number,grid:[][]): Promise<Layout>{
        const layout = await this.layoutRepo.saveLayoutEdit(layoutId,grid)
        return layout
    }
    public async deleteLayout (layoutId:number): Promise<Layout> {
        const layout = await this.layoutRepo.deleteLayout(layoutId);
        return layout
    }
}
