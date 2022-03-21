export type Layout = {
    id:number,
    userId:number,
    name:string,
    layout: string
    createdAt:Date,
    updatedAt:Date
}

export type LayoutWithoutLayout = {
    id:number,
    userId:number,
    name:string,
    createdAt:Date,
    updatedAt:Date
}
