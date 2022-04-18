import { Graph,GraphEntity,Placeholder, Vertex } from "./BruteForce";
import _, { CollectionChain } from 'lodash';



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



  function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }



function makePlaceHolder() : Vertex{
 let placeHolder : Vertex = { entity:{Kind:"Placeholder"} , edges:[{ entity: { Kind: 'Start' }, weight: 0 }, { entity: { Kind: 'End' }, weight: 0 },]}
return placeHolder
}
export const branchAndBound = (graph:Graph) => {
    // let graphString = (JSON.stringify(originalGraph,replacer))
    // let graph = JSON.parse(graphString,reviver)
    console.log("branch and bound")
    //instead of using a placeholder point I can attempt to just set the distance between start and end to 0
    // however in doing so graphs that are just start to end will result in incorrect answers
    //maybe just use brute force instead for those situations?

    let placeHolder = makePlaceHolder();

//     let start = graph.vertices.get('Start')?.edges
   graph.vertices.set("Placeholder", placeHolder);
    let order : string [] = Array.from(graph.vertices.keys());
    let indexOfTest = order.findIndex(x => x==="Placeholder")
//    let order = _.forOwn(vertices,function(val,key){
//        console.log(key)
//        console.log("in for own")
//          return key;
// })
    // for(const [key,value] of Object.entries(graph)){
    //     console.log(key)
    //     order.push(key)
    // }
    // console.table(order)
    // console.log(graph)

   //     {entity: {Kind:"placeHolder"} ,
//     edges:start
// } )
    // console.log(graph.vertices)
    console.log("order is",order)
    // graph.vertices
    // console.log(graph.vertices.get('placeHolder'))
    // order.unshift = "placeHolder"
    graph.vertices.delete("Placeholder")
    let matrix = createMatrixFromGraph(graph,order)
}

function createMatrixFromGraph(graph:Graph,order: string []){
    //graph size + 1 is the size of our matrix [n][n] is going to be inifinity
    let matrixSize = order.length;
    // console.log(graph.vertices.get("Start")?.edges[1])
    // console.log(graph.vertices.get("Start")?.edges)
    // console.log(graph.vertices.get("Start"))
    // console.log(order)

    let matrix :number[][] = [];
    for(let i = 0 ; i < matrixSize ; i++){
        let currRow: number[] = new Array<number>(matrixSize)
        for(let j = 0 ; j < matrixSize;j++){
            if(i === j) {
                currRow[i] = Number.MAX_VALUE;
            } else{
                //find the index in the order based on the kind
            }
        }
        matrix.push(currRow)
    }
    // console.log(matrix)
    return matrix
    }
    function solver(matrix) {

    }


    function makeRowInfinity(matrix,row){

    }
    function makeColumnInfinity(matrix,column){

    }
    function makePointInfinity(matrix,row,column){
        //use this when going to a new item/node to make it infinity to the start
        //if at item 3 make the row of item 3 column of start infinity
    }

    function reduceMatrix(matrix){

    }

    function findMinInRow(matrix,row){

    }

    function findMinInColumn(matrix,column){

    }
