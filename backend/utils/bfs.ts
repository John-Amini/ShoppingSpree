import _, { CollectionChain } from 'lodash'
import { Graph, GraphEntity, Vertex } from './BruteForce'

export type BFSEntity =
    | 'none'
    | 'wall'
    | 'start'
    | 'end'

export type Point = {
    row: number,
    column: number,
    type: BFSEntity | string
}

// all return values are inclusive
export function GetBoundries(matrix: Point[][]): { xMin: number, xMax: number, yMin: number, yMax: number } {
    const xMin = 0
    const xMax = matrix.length - 1;
    const yMin = 0;
    const yMax = matrix[0].length - 1;

    return {
        xMin,
        xMax,
        yMin,
        yMax,
    }
}

// string in graph is type
export function GenerateGraph(matrix: Point[][]): Graph {
    //all points is a list of points that you have to run bfs on
    const allPoints = findBFSPoints(matrix);
    //result of actually running bfs on each allPoints result node
    const allBFS = GetAllPaths(matrix);

    const toKeyVal = allBFS.map(x => ({ key: GraphEntityToMapKey(BFSEntityToGraphEntity(x.startPoint.type)), value: ToVertices(x.startPoint, x.allPaths) }))

    const map = new Map<string, Vertex>();

    toKeyVal.forEach(x => map.set(x.key, x.value))

    // make sure the graph is complete. if its not then there is an unreachable entity.
    const pointsCount = allPoints.length;
    if(map.size != pointsCount){
        throw new Error('Graph is incomplete.')
    }

    for (let key of map.keys()) {
        if(map.get(key)?.edges.length != pointsCount){
            throw new Error("All points cannot be reached!")
        }
    }

    return {
        vertices: map
    }
}

export function GetAllPaths(matrix: Point[][]) {

    const allPoints = findBFSPoints(matrix);
    //getPointAndDist is making a list of paths from that point x
    const allBFS = _.chain(allPoints).map(x => ({ startPoint: x, allPaths: GetPointAndDist(matrix, x) })).value();

    return allBFS;

}


function ToVertices(startPoint: Point, pointsAndDist: PointAndDist[]): Vertex {
    const edges = pointsAndDist.map(x => ({
        entity: BFSEntityToGraphEntity(x.point.type),
        weight: x.distance,
    }))

    const vertex = {
        entity: BFSEntityToGraphEntity(startPoint.type),
        edges: edges,
    }

    return vertex;
}

function GraphEntityToMapKey(entity: GraphEntity): string {

    switch(entity.Kind){
        case 'Start':
        case 'End':
            return entity.Kind;
        case 'Item':
            return entity.ItemId.toString()
        default:
            throw new Error('Cannot convert to map key.')
    }
}

function BFSEntityToGraphEntity(entity: BFSEntity | string): GraphEntity {
    if (entity == 'start')
        return { Kind: 'Start' };
    else if (entity == 'end')
        return { Kind: 'End' };
    else if (entity == 'wall')
        throw new Error('Wall cannot exist in BFS to Graph.')
    else if (entity == 'none')
        throw new Error('None cannot exist in BFS to Graph.')
    else
        return { Kind: 'Item', ItemId: _.toNumber(entity) }
}

function findBFSPoints(matrix: Point[][]): Point[] {
    return _.flatMap(matrix,
        row => _.chain(row).filter(x => {
            switch (x.type) {
                case 'none':
                case 'wall':
                    return false;
                case 'start':
                case 'end':
                default:
                    return true;
            }
        }).value()
    )
}

// this will not contain walls or none types
type PointAndDist = {
    point: Point,
    distance: number,
    path: Coordinate[],
}

type Coordinate = {
    x: number,
    y: number,
}

type PointAndPath = {
    point: Point,
    path: Coordinate[],
}

export function GetPointAndDist(matrix: Point[][], initialPoint: Point): PointAndDist[] {

    const initial = {
        point: initialPoint,
        path: [{ x: initialPoint.row, y: initialPoint.column }]
    }

    //const levelOrderTraversal = LeveledOrderBFS(matrix, _.chain([initial] as PointAndPath[]), new Set<string>());
    const visited = new Set<string>();
    visited.add(JSON.stringify({ x: initial.point.row, y: initial.point.column }));
    //list of lists of the bfs
    const levelOrderTraversal = _.chain(LeveledOrderBFS(matrix, [initial], visited));

    const withDist = levelOrderTraversal.flatMap((x, i) => x.map(pointAndPath => ({ pointAndPath: pointAndPath, distance: i })));

    const filterValid: CollectionChain<PointAndDist> = withDist.filter(x => {
        const t = x.pointAndPath.point.type;
        // compiler wont catch any mistakes with this...
        return (t != 'wall' && t != 'none' )
    }).map(x => ({
        point: x.pointAndPath.point,
        path: x.pointAndPath.path,
        distance: x.distance
    }))

    return filterValid.value()
}

export function LeveledOrderBFS(matrix: Point[][], queue: PointAndPath[], visited: Set<string>): PointAndPath[][] {
    const thisLevel = queue;

    if(thisLevel.length == 0) {
        return [[]]
    }


    const next = _.flatMap(thisLevel,p => {

        const traversal = GetTraversal(matrix, p.point, visited);

        traversal.forEach(x => visited.add(JSON.stringify({ x: x.x, y: x.y })));

        const nextLevel: PointAndPath[] = traversal.map(c => ({
            point: matrix[c.x][c.y],
            path: _.cloneDeep(p.path).concat({ x: c.x, y: c.y }),
        }))
        return nextLevel;
    })
    return [thisLevel].concat(LeveledOrderBFS(matrix, next, visited).filter(x => x.length != 0));
}


export function GetTraversal(matrix: Point[][], currPoint: Point, visited: Set<string>): Coordinate[] {
    const { xMin, xMax, yMin, yMax } = GetBoundries(matrix);

    return Directions.map(p =>
    ({
        x: p.x + currPoint.row,
        y: p.y + currPoint.column,
    })
    ).filter(p =>
        !visited.has(JSON.stringify(p))
        && p.x >= xMin
        && p.x <= xMax
        && p.y >= yMin
        && p.y <= yMax
    ).filter(resP => {
        const point = matrix[resP.x][resP.y]
        return point.type != 'wall';
    });
}


export const Directions = [
    { x: 0, y: 1 }, // up
    { x: 0, y: -1 }, // down
    { x: 1, y: 0 }, // right
    { x: -1, y: 0 }, // left
]
