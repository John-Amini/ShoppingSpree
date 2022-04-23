import { FinalPathAndWeight, Graph,GraphEntity,Placeholder, Vertex } from "./BruteForce";
import _, { CollectionChain } from 'lodash';

export type MatrixAndCost = {
  cost: number,
  matrix:number[][];
}
//NEED TO FIX COST BY GRABBING THE COST OF THE VALUE FROM THE ROW OF PARENT COLUMN OF CHILD ON THE REDUCTION ITSELF
let upper = Number.MAX_VALUE;
let minPath : String[]= [];


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
 let placeHolder : Vertex = { entity:{Kind:"Placeholder"} , edges:[{ entity: { Kind: 'Start' }, weight: -1 }, { entity: { Kind: 'End' }, weight: -1 },]}
return placeHolder
}
export const branchAndBound = (graph:Graph) => {
    // let graphString = (JSON.stringify(originalGraph,replacer))
    // let graph = JSON.parse(graphString,reviver)
    upper = Number.MAX_VALUE;

    console.log("branch and bound")
    //instead of using a placeholder point I can attempt to just set the distance between start and end to 0
    // however in doing so graphs that are just start to end will result in incorrect answers
    //maybe just use brute force instead for those situations?

    let placeHolder = makePlaceHolder();

//let start = graph.vertices.get('Start')?.edges
   graph.vertices.set("Placeholder", placeHolder);
  //  console.log(graph.vertices.get("Start")?.edges[0])
    let order : string [] = Array.from(graph.vertices.keys());
    // move placeholder to front
    let indexOfTest = order.findIndex(x => x==="Placeholder")
    let temp = order[0];
    order[0] = order[indexOfTest];
    order[indexOfTest] = temp;

    indexOfTest = order.findIndex(x => x==="Start");
    temp = order[1];
    order[1] = order[indexOfTest]
    order[indexOfTest] = temp

    indexOfTest = order.findIndex(x => x==="End");
    temp = order[order.length - 1];
    order[order.length - 1] = order[indexOfTest]
    order[indexOfTest] = temp
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
    let matrix = createMatrixFromGraph(graph,order)

    let initialMatrixAndCost = reduceMatrix(matrix)
    // console.log(initialMatrixAndCost)
    // console.log(matrix)
    let hashmap = new Map();
    let visited = new Set <String>();
    visited.add("Placeholder")
    hashmap.set("Placeholder",initialMatrixAndCost)
    // now have the cost of starting and currently at placeholder
    solver(matrix,["Placeholder"] , order , hashmap,visited);
    // console.log(upper)
    // console.log(minPath)
    // console.log(matrix);
    parseList(minPath)
    graph.vertices.delete("Placeholder")
    minPath.unshift();
    let arr = parseList(minPath);
    console.log(arr);
    let solution :FinalPathAndWeight = {finalWeight:upper, finalPath:arr}
    return solution;
}
function parseList(minPath){
  let resArray : GraphEntity [] = []
  for(let entity  of minPath){
    console.log(entity)
  if (entity == 'Start')
        resArray.push({ Kind: 'Start' });
    else if (entity == 'End')
        resArray.push( { Kind: 'End' });
    else if(entity == 'Placeholder')
      continue;
    else
        resArray.push({ Kind: 'Item', ItemId: _.toNumber(entity) })
  }
  return resArray
      }
function solver(matrix,pathSoFar:String [],order,hashmap : Map<string,MatrixAndCost>,visited : Set<String>) {
    //we know because I made sure order has placeholder is at 0 start is at 1 and end is at length - 1

  if(pathSoFar.length === 1){
    console.log("pathSoFar === 1")

    //we are at placeholder we HAVE to go to start
    let testing = hashmap.get(pathSoFar.join(" "))
    let copyOf = JSON.parse(JSON.stringify(testing?.matrix));
    pathSoFar.push("Start");
    //placeholder row becomes infinity
    makeRowInfinity(copyOf,0);
    //start column becomes infinity
    makeColumnInfinity(copyOf,1)

    makePointInfinity(copyOf,1,0)
    let res = reduceMatrix(copyOf)
    res.cost = res.cost + (testing?.cost!== undefined ? testing.cost : 0) + (testing?.matrix!==undefined ? testing.matrix[0][1] : 0)
    hashmap.set(pathSoFar.join(" "),res);
    solver(matrix,pathSoFar,order,hashmap,visited)
    //do logic on matrix
  } else if(pathSoFar.length === order.length){
    //done? //need to update upper
    console.log("pathSoFar === order.length")
    let matrixAndCostOfEnd = hashmap.get(pathSoFar.join(" "))

    if(upper > (matrixAndCostOfEnd?.cost === undefined ? Number.MAX_VALUE : matrixAndCostOfEnd.cost) ){
      upper = (matrixAndCostOfEnd?.cost !== undefined ? matrixAndCostOfEnd.cost : Number.MAX_VALUE);
      minPath = pathSoFar
      return;
    }
  } else if(pathSoFar.length === order.length - 1){
    // need to go to end
    console.log("pathSoFar === order.length - 1")
    let parentMatrixAndCost = hashmap.get(pathSoFar.join(" "))
    let copyOfMatrix = JSON.parse(JSON.stringify(parentMatrixAndCost?.matrix))
    pathSoFar.push("End")
    let parentString = pathSoFar[pathSoFar.length -1];
    let rowOfParent = order.indexOf(parentString);
    makeRowInfinity(copyOfMatrix,rowOfParent);
    makeColumnInfinity(copyOfMatrix,order.length - 1 );
    //child to placeholder make infinity
    //row is end row column is placeholder column
    makePointInfinity(copyOfMatrix,order.length -1,0)

    let res = reduceMatrix(copyOfMatrix);
    res.cost = res.cost + (parentMatrixAndCost?.cost!==undefined ? parentMatrixAndCost?.cost : 0)
    hashmap.set(pathSoFar.join(" "),res);
    solver(matrix,pathSoFar,order,hashmap,visited)
  }
  else{
    console.log("pathSoFar === NOTHING")
    // console.log(pathSoFar)
    //parent row that becomes infinity
    //child column is the one that becomes infinity
    //now need to create and compare for each item available
    let notTouchedYet = order.filter(x => !pathSoFar.includes(x) && x!=="End");
    let parentMatrixAndCost = hashmap.get(pathSoFar.join(" "));
    let parentString = pathSoFar[pathSoFar.length - 1];
    // console.log(notTouchedYet)
    //all items in notTouchedYet are all the items that i need to do the math on
    for(let i = 0 ; i < notTouchedYet.length;i++){
      let copyOfParentMatrix = JSON.parse(JSON.stringify(parentMatrixAndCost?.matrix));
      let rowOfParent = order.indexOf(parentString);
      let columnOfChild = order.indexOf(notTouchedYet[i]);
      makeRowInfinity(copyOfParentMatrix,rowOfParent);
      makeColumnInfinity(copyOfParentMatrix,columnOfChild);
      //need to make point infinity towards start however they are all already infinity towards placeholder so unnecessary? but might as well do it as a test
      makePointInfinity(copyOfParentMatrix,columnOfChild,1)
      let currentMatrixAndCost = reduceMatrix(copyOfParentMatrix)
      currentMatrixAndCost.cost = currentMatrixAndCost.cost + (parentMatrixAndCost?.cost !== undefined ? parentMatrixAndCost?.cost : 0) + (parentMatrixAndCost?.matrix!==undefined ? parentMatrixAndCost.matrix[rowOfParent][columnOfChild] : 0)
      hashmap.set(pathSoFar.join(" ") + ` ${notTouchedYet[i]}`,currentMatrixAndCost);
      // console.log(notTouchedYet[i]);
      // console.log(currentMatrixAndCost)
    }

    //did the math on everything pertaining to this particular parent/path so have all of its children matrices and costs
    visited.add(pathSoFar.join(" "))
    //now need to find the current minimum cost within the tree while making sure to not do ones that have already been fully explored
    //no optimal way to do this just need to check cost of everything involved so far
    let minCost = Number.MAX_VALUE;
    let minimumMatrixAndCost : MatrixAndCost
    let minPathSoFar :String[] =[]
    for(let [key,matrixAndCost] of hashmap.entries() ){
      let keyArray = key.split(" ");
      let checkIfAlreadyExplored = keyArray[keyArray.length - 1]
      //current issue is that this line makes me fully ignore things that ive searched even lower down the tree
        //solutions include making visited contain the string for the full path
      if(visited.has(key)) {
        //already fully explored this one so its children already exist
        continue;
      }
      if(minCost > matrixAndCost.cost){
        //need to change everything
        minCost = matrixAndCost.cost;
        minimumMatrixAndCost = matrixAndCost;
        minPathSoFar = keyArray;
      }
    }
    solver(matrix,minPathSoFar,order,hashmap,visited)
  }
}


function makeRowInfinity(matrix,row){
  for(let i = 0 ; i < matrix.length ; i++){
    matrix[row][i] = Number.MAX_VALUE
  }

}
function makeColumnInfinity(matrix,column){
  for(let i = 0 ; i < matrix.length;i++){
    matrix[i][column]= Number.MAX_VALUE
  }
}
function makePointInfinity(matrix,row,column){
    //use this when going to a new item/node to make it infinity to the start
    //always make it towards placeholder to infinity
    //if at item 3 make the row of item 3 column of start infinity
    matrix[row][column] = Number.MAX_VALUE;
}



function createMatrixFromGraph(graph:Graph,order: string []){
    //graph size + 1 is the size of our matrix [n][n] is going to be inifinity denoted by math max
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
                // i corresponds to whos row
                // j corresponds to whos column
                let rowOwner = order[i];
                let columnOwner = order[j];
                let vertice = graph.vertices.get(rowOwner)
                // console.log("VERTICE")
                // console.log(vertice)

                // let edgeIndex = vertice?.edges.findIndex(vertex => {
                //   if(vertex.entity.Kind === "Item"){
                //     if(vertex.entity.ItemId === parseInt(columnOwner)){
                //       return vertex.entity.ItemId === parseInt(columnOwner);
                //     }
                //   } else{
                //     if(vertex.entity.Kind === columnOwner ) return vertex.entity.Kind === columnOwner
                //   }
                //   return false
                // } )

                let edgeIndex = _.findIndex(vertice?.edges, (vertex) => {
                  if(vertex.entity.Kind === "Item"){
                    if(vertex.entity.ItemId === parseInt(columnOwner)){
                      return vertex.entity.ItemId === parseInt(columnOwner);
                    }
                  } else{
                    if(vertex.entity.Kind === columnOwner ) return vertex.entity.Kind === columnOwner
                  }
                  return false
                },0 )
                let edge = edgeIndex !== -1 ? vertice?.edges[edgeIndex] : undefined;
                if(edge === undefined){
                  currRow[j] = Number.MAX_VALUE
                  if((rowOwner === "Start" || rowOwner === "End") && columnOwner === "Placeholder" ){
                    currRow[j] = 0;
                  }
                } else{

                  currRow[j] = edge.weight;
                  if(edge.weight === -1 ) currRow[j] = 0;
                }
            }
        }
        matrix.push(currRow)
    }

    return matrix
    }

    function reduceMatrix  (matrix) : (MatrixAndCost){
      let rowReductionTotal = 0;
      let resultMatrix:number[][] = [];
      //i is going through each row
      for(let i = 0 ; i < matrix.length;i++){
        let min = findMinInRow(matrix,matrix[i]);
        let currRow: number[] = new Array<number>(matrix.length)
        rowReductionTotal = rowReductionTotal  + min;
        for(let j = 0 ; j < matrix.length;j++){
          let num = matrix[i][j] === Number.MAX_VALUE ? Number.MAX_VALUE : matrix[i][j] - min;
          currRow[j] = num
        }
        resultMatrix.push(currRow);
      }
      // console.log("RESULT OF ROW REDUCTION")
      // console.log(resultMatrix);
      let columnReductionTotal = 0;

      for(let i = 0 ;i < matrix.length;i++){
        let column = i;
        let min = findMinInColumn(resultMatrix,column);
        columnReductionTotal = columnReductionTotal + min;
        for(let j = 0 ; j < matrix.length;j++){
          // console.log("AN ITER OF J")
          let num = resultMatrix[j][i] === Number.MAX_VALUE ? Number.MAX_VALUE : resultMatrix[j][i] - min;
          // console.log(num);
          resultMatrix[j][i] = num
        }
      }
      let result :MatrixAndCost = {cost:rowReductionTotal + columnReductionTotal , matrix:resultMatrix}
      return result
    }

    function findMinInRow(matrix,row){
      // return row.reduce((prev,curr) => prev < curr ? prev : curr)
      let min = Number.MAX_VALUE;
      for(let i = 0 ;i < row.length;i++){
        min = row[i] > min ? min : row[i]
      }
      return min === Number.MAX_VALUE ? 0 : min
    }

    function findMinInColumn(matrix,column){
      //assume column is just a number?
      let min = Number.MAX_VALUE;
      for(let i = 0 ; i < matrix.length;i++){
        min = matrix[i][column] > min ? min : matrix[i][column]
      }
      // console.log(column)
      // console.log(min)
      return min === Number.MAX_VALUE ? 0 : min;
    }
