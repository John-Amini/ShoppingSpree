import _ from "lodash"
export function createPath(allPaths,solution){
    //solution has finalPath which is an array of the order I have to go and finalWeight which is the last weight necessary for the problem
    let finalPath = solution.finalPath
    // console.log(finalPath[0])
    // console.log(finalPath[1])
    // console.log(allPaths[0])
    // console.log(allPaths[1]
    let fullPath = [];
    for(let i = 0; i < finalPath.length - 1;i++){
        let from = finalPath[i];
        let to = finalPath[i+1];
        let  path = findCurrInAllPaths(allPaths,from,to)
        fullPath = fullPath.concat(path);
    }
    // console.log(fullPath)
    // //difference between fullPath and solution.finalWeight is number of nodes start + items + end === 2 + n
    // console.log(fullPath.length);
    // console.log(solution.finalWeight)
    return fullPath
}

function findCurrInAllPaths(paths,from,to){
    // console.log(from.Kind)
    let filtered = paths.filter((x) => x.startPoint.type === from.Kind.toLowerCase() || String(from.ItemId) === x.startPoint.type)
    let pathsFromCurr = filtered[0].allPaths
    let toPointAndPath = pathsFromCurr.filter((x) => x.point.type === to.Kind.toLowerCase() || String(to.ItemId) === x.point.type)
    // console.log(toPointAndPath)
    // console.log(toPointAndPath[0].path)
    return toPointAndPath[0].path;
    // console.log(filtered)
    // console.log(pathsFromCurr)
}
