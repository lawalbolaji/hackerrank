// console.log("graph is alive!")

// graph = nodes + edges
/* 
    traverse a graph:
        depth first traversal - stack
        breadth first traversal - queue

 */

// const graph = {
//     a: ["b", "c"],
//     b: ["d"],
//     c: ["e"],
//     d: ["f"],
//     e: [],
//     f: [],
// };

// const depthFirstPrint = (graph, source) => {
//     const stack = [source];

//     while (stack.length > 0) {
//         const current = stack.pop();

//         // process your node here when it leaves the stack
//         console.log(current);

//         graph[current].forEach((element) => {
//             stack.push(element);
//         });

//         // console.log(stack);
//     }
// };

// // depthFirstPrint(graph, "a"); // a, c, e, b, d, f

// const depthFirstRecursive = (graph, source) => {
//     console.log(source);
//     graph[source].forEach((element) => {
//         depthFirstRecursive(graph, element);
//     });
// };

// // depthFirstRecursive(graph, "a"); // a, b, d, f, c, e

// const breadthFirstPrint = (graph, source) => {
//     const queue = [source];

//     while (queue.length > 0) {
//         const current = queue.shift();
//         console.log(current);

//         graph[current].forEach((element) => {
//             queue.push(element);
//         });
//     }
// };

// // breadthFirstPrint(graph, "a");

// const edges = [
//     ["i", "j"],
//     ["k", "i"],
//     ["m", "k"],
//     ["k", "l"],
//     ["o", "n"],
// ];

// const buildGraph = (edges) => {
//     const graph = {};

//     edges.forEach((element) => {
//         const [a, b] = element;

// if (graph[a] === undefined) graph[a] = [];
// if (graph[b] === undefined) graph[b] = [];

// graph[a].push(b);
// graph[b].push(a);
//     });

//     return graph;
// };

// const undirectedPath = (edges, src, dest) => {
//     const graph = buildGraph(edges);
//     return hasPath(graph, src, dest, new Set());
// };

// const hasPath = (graph, src, dest, visited) => {
//     if (src === dest) return true;
//     if (visited.has(src)) return false;

//     visited.add(src);

//     for (let element of graph[src]) {
//         if (hasPath(graph, element, dest, visited)) return true;
//     }

//     return false;
// };

// console.log(undirectedPath(edges, "k", "l"));

// const graph = {
//     0: [8, 1, 5],
//     1: [0],
//     5: [0, 8],
//     8: [0, 5],
//     2: [3, 4],
//     3: [2, 4],
//     4: [3, 2],
// };

// const largestIsland = (graph) => {
//     const visited = new Set();
//     let largest = 0;

//     for (let node in graph) {
//         const size = explore(graph, node, visited, { val: 0 }); // passing count = 0 instead of count = { val: 0 } will lead to a classic variable reference bug
//         if (size > largest) largest = size;
//     }

//     console.log({ largest });
// };

// const explore = (graph, node, visited, count) => {
//     if (visited.has(String(node))) return 0;

//     visited.add(String(node));
//     count["val"] += 1;

//     graph[node].forEach((element) => {
//         explore(graph, element, visited, count);
//     });

//     return count["val"];
// };

// largestIsland(graph);

// const edges = [
//     ["w", "x"],
//     ["x", "y"],
//     ["z", "y"],
//     ["z", "v"],
//     ["w", "v"],
// ];

// /*
//     to adjacency list
//         {
//             v: [w, z],
//             w: [v, x],
//             x: [w, y],
//             y: [x, z],
//             z: [v, y],
//         }
//  */

// const buildGraph = (edges) => {
//     const graph = {};

//     for (let edge of edges) {
//         const [a, b] = edge;

//         if (!graph[a]) graph[a] = [];
//         if (!graph[b]) graph[b] = [];

//         graph[a].push(b);
//         graph[b].push(a);
//     }

//     return graph;
// };

// // console.log(buildGraph(edges));

// const shortestPath = (edges, src = "w", dest = "z") => {
//     const graph = buildGraph(edges);
//     const visited = new Set();

//     const queue = [[src, 0]];
//     while (queue.length > 0) {
//         const [current, distance] = queue.shift();

//         if (current === dest) return distance;
//         visited.add(current);

//         for (let el of graph[current]) {
//             if (visited.has(el)) continue;
//             queue.unshift([el, distance + 1]);
//         }
//     }
// };

// // console.log(shortestPath(edges, "v", "w"));

// const world = [
//     ["W", "L", "W", "W", "W"],
//     ["W", "L", "W", "W", "W"],
//     ["W", "L", "W", "L", "W"],
//     ["W", "W", "L", "L", "W"],
//     ["L", "W", "W", "L", "L"],
//     ["L", "L", "W", "W", "W"],
// ];

// // const countIslands = (grid = world) => {
// //     let count = 0;
// //     const visited = new Set();

// //     for (let row = 0; row < grid.length; row++) {
// //         for (let column = 0; column < grid[row].length; column++) {
// //             const current = grid[row][column];
// //             if (current === "W") continue;

// //             // explore island
// //             if (exploreGrid(grid, row, column, visited)) count += 1;
// //         }
// //     }

// //     console.log(count);
// //     return count;
// // };

// // const exploreGrid = (grid, row, column, visited) => {
// //     if (grid[row]?.[column] === undefined || grid[row][column] === "W") return false;
// //     if (visited.has(row + "," + column)) return false;

// //     visited.add(row + "," + column);

// //     // just mark the grounds as explored
// //     exploreGrid(grid, row - 1, column, visited); // up
// //     exploreGrid(grid, row + 1, column, visited); // down
// //     exploreGrid(grid, row, column + 1, visited); // right
// //     exploreGrid(grid, row, column - 1, visited); // left

// //     return true;
// // };

// // countIslands();

// const minIsland = (grid = world) => {
//     let minSize = Infinity;
//     const visited = new Set();

//     for (let row = 0; row < grid.length; row++) {
//         for (let column = 0; column < grid[row].length; column++) {
//             const current = grid[row][column];
//             if (current === "W") continue;

//             // explore island
//             const size = exploreGrid(grid, row, column, visited);
//             if (size !== 0 && size < minSize) minSize = size;
//         }
//     }

//     console.log(minSize);
//     return minSize;
// };

// const exploreGrid = (grid, row, column, visited) => {
//     if (grid[row]?.[column] === undefined || grid[row][column] === "W") return 0;
//     if (visited.has(row + "," + column)) return 0;

//     visited.add(row + "," + column);

//     return (
//         1 +
//         exploreGrid(grid, row - 1, column, visited) +
//         exploreGrid(grid, row + 1, column, visited) +
//         exploreGrid(grid, row, column + 1, visited) +
//         exploreGrid(grid, row, column - 1, visited)
//     );
// };

// minIsland();

// 6 6 6 6 12 6 30 6 18 12 6 6 6 6 6 12 36 6 6 6 6 30 6 12 6 12 6 12 48 12 12 6 12 12 6 12 18 6 12 6 12 6 12 24 6 6 12 6 6 6 6 12 24 12 12 6 6 6 12 6 6 24 24 18 12 24 12 6 6

// ------------5(2)-3(2)---------------6(2)-------5(2)---------------8(2)

// 6 6 6 6 12 6 12 6 12 12 6 6 6 6 6 12 12 6 6 6 6 12 6 12 6 12 6 12 12 12 12 6 12 12 6 12 12 6 12 6 12 6 12 12 6 6 12 6 6 6 6 12 12 12 12 6 6 6 12 6 6 12 12 12 12 12 12 6 6
