import _, { CollectionChain } from 'lodash';

export type Start = { Kind: 'Start' }
export type End = { Kind: 'End' }
export type Item = { Kind: 'Item', ItemId: number; }

export type GraphEntity =
    | Start
    | End
    | Item

export type Vertex = {
    entity: GraphEntity;
    edges: { entity: GraphEntity, weight: number }[];
}

export type Graph = {
    vertices: Map<string, Vertex>
}

export const BruteForce = (graph: Graph) => {

    const startNode = graph.vertices.get('Start')
    if (!startNode) {
        throw new Error('No Start Node in Graph')
    }

    const endNode = graph.vertices.get('End')
    if (!endNode) {
        throw new Error('No End Node in Graph')
    }

    const initialPath = [startNode.entity]; // hopefully this be array
    const initialWeight = 0

    const pushDownVal = {
        path: initialPath,
        weight: initialWeight
    }

    return GetMinPath(graph, startNode.entity, endNode.entity as End, new Set<string>(), pushDownVal);
}

export type FinalPathAndWeight = { finalPath: GraphEntity[], finalWeight: number };

// export function BackTrack(graph: Graph, current: Entity, targetEnd: End, visited: Set<Entity>, pushDownVal: { path: Entity[], weight: number }): FinalPathAndWeight | null{
//     //const currentNodeCost = currentNode.

//     const currentNodeStr = current.Kind == 'Item' ? current.ItemId.toString() : current.Kind;

//     const currentNode = graph.vertices.get(currentNodeStr);

//     if (!currentNode) {
//         throw new Error(`${currentNode} not in the graph.`);
//     }

//     if (currentNode.edges.length == 0) {
//         throw new Error(`${currentNode} does not have any edges in the graph.`)
//     }

//     if(visited.has(current)){
//         return null;
//     }

//     visited.add(current);

//     // we visited all nodes aka base case
//     if (visited.size - 1 == graph.vertices.size) {

//         const end = currentNode.edges.find(x => x.entity.Kind == 'End');
//         if(!end){
//             throw new Error('Incomplete Graph. There is no end attached to $`currentNode`');
//         }

//         const cpPath = _.cloneDeep(pushDownVal.path);

//         const finalPath = cpPath.concat(end.entity);
//         const finalWeight = pushDownVal.weight + end.weight;

//         return {
//             finalPath: finalPath,
//             finalWeight: finalWeight
//         };
//     }

//     // filter out end notde
//     const iter =
//         currentNode.edges
//             .filter(x => x.entity.Kind == 'End')
//             .map(x => {
//                 const cpPath = _.cloneDeep(pushDownVal.path);
//                 const cpVisited = _.cloneDeep(visited);

//                 const newPushDownVal = {
//                     path: cpPath.concat(x.entity),
//                     weight: pushDownVal.weight + x.weight
//                 }
//                 //const { finalPath, finalWeight } = BackTrack(graph, x.entity, target, visited, newPushDownVal);
//                 return BackTrack(graph, x.entity, targetEnd, cpVisited, newPushDownVal);
//             })
//             .filter(x => x == null); // remove all paths that lead no where

//     const minWeightTraversed = _.minBy(iter, x => (x as FinalPathAndWeight ) .finalWeight);

//     if(!minWeightTraversed){
//         throw new Error(`minWeightTraversed is empty for ${graph}, ${current} ${targetEnd}, ${visited}, ${pushDownVal}`);
//     }

//     return minWeightTraversed;
// }

export function AllPathsIterator(graph: Graph, current: GraphEntity, targetEnd: End, visited: Set<string>, pushDownVal: { path: GraphEntity[], weight: number })
    : CollectionChain<{ finalPath: GraphEntity[], finalWeight: number }> {
    const currentNodeStr = current.Kind == 'Item' ? current.ItemId.toString() : current.Kind;
    const currentNode = graph.vertices.get(currentNodeStr);

    if (!currentNode) {
        throw new Error(`${currentNode} not in the graph.`);
    }

    if (currentNode.edges.length == 0) {
        throw new Error(`${currentNode} does not have any edges in the graph.`)
    }

    if (visited.has(currentNodeStr)) {
        return _.chain([] as { finalPath: GraphEntity[], finalWeight: number }[]);
    }

    visited.add(currentNodeStr);

    // we visited all nodes aka base case
    if (visited.size == graph.vertices.size - 1) {

        const end = currentNode.edges.find(x => x.entity.Kind == 'End');
        if (!end) {
            throw new Error('Incomplete Graph. There is no end attached to $`currentNode`');
        }

        const cpPath = _.cloneDeep(pushDownVal.path);

        const finalPath = cpPath.concat(end.entity);
        const finalWeight = pushDownVal.weight + end.weight;

        return _.chain([{
            finalPath: finalPath,
            finalWeight: finalWeight,
        }]);
    }

    const iter =
        currentNode.edges
            .filter(x => x.entity.Kind != 'End')

    const flatten = _.chain(iter).flatMap(x => {
        const cpPath = _.cloneDeep(pushDownVal.path);
        const cpVisited = _.cloneDeep(visited);

        const newPushDownVal = {
            path: cpPath.concat(x.entity),
            weight: pushDownVal.weight + x.weight
        }

        return AllPathsIterator(graph, x.entity, targetEnd, cpVisited, newPushDownVal).value();
    });

    return flatten;
}

export function GetMinPath(graph: Graph, current: GraphEntity, targetEnd: End, visited: Set<string>, pushDownVal: { path: GraphEntity[], weight: number }): FinalPathAndWeight {

    const allPathsAndWeightsIterator = AllPathsIterator(graph, current, targetEnd, visited, pushDownVal);
    return allPathsAndWeightsIterator.minBy(x => x.finalWeight).value();
}
