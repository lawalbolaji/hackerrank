"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
    inputString += inputStdin;
});

process.stdin.on("end", function () {
    inputString = inputString
        .replace(/\s*$/, "")
        .split("\n")
        .map((str) => str.replace(/\s*$/, ""));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the findShortest function below.

/*
 * For the unweighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] to <name>To[i].
 *
 */
function findShortest(graphNodes, graphFrom, graphTo, ids, val) {
    const edges = graphFrom.map((gFrom, idx) => [gFrom, graphTo[idx]]);
    const graph = buildGraph(edges, graphNodes);
    const colorMap = buildColourMap(graphNodes, ids);
    const visited = new Set();

    let minDistance = Infinity;
    for (const node in graph) {
        if (colorMap[node] === val) {
            const queue = [[node, 0]];

            while (queue.length > 0) {
                const [current, distance] = queue.shift();

                visited.add(String(current));
                if (colorMap[current] === val && distance !== 0) {
                    if (distance < minDistance) {
                        minDistance = distance;
                    }
                }

                for (let el of graph[current]) {
                    if (visited.has(String(el))) continue;
                    queue.unshift([el, distance + 1]);
                }
            }

            visited.clear();
        }
    }

    if (minDistance === Infinity) return -1;

    return minDistance;
}

function buildColourMap(nodes, ids) {
    const colorMap = {};
    for (let i = 1; i <= nodes; i++) {
        colorMap[i] = ids[i - 1];
    }

    return colorMap;
}

function buildGraph(edges, n) {
    const graph = {};
    for (const edge of edges) {
        const [a, b] = edge;

        if (graph[a] === undefined) graph[a] = [];
        if (graph[b] === undefined) graph[b] = [];

        graph[a].push(b);
        graph[b].push(a);
    }

    return graph;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const graphNodesEdges = readLine().split(" ");
    const graphNodes = parseInt(graphNodesEdges[0], 10);
    const graphEdges = parseInt(graphNodesEdges[1], 10);

    let graphFrom = [];
    let graphTo = [];

    for (let i = 0; i < graphEdges; i++) {
        const graphFromTo = readLine().split(" ");

        graphFrom.push(parseInt(graphFromTo[0], 10));
        graphTo.push(parseInt(graphFromTo[1], 10));
    }

    const ids = readLine()
        .split(" ")
        .map((idsTemp) => parseInt(idsTemp, 10));

    const val = parseInt(readLine(), 10);

    const ans = findShortest(graphNodes, graphFrom, graphTo, ids, val);

    ws.write(ans + "\n");

    ws.end();
}
