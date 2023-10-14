"use strict";

// to run this script with data from file

// #!/bin/sh
// cat '[path_to_input_file]' | OUTPUT_PATH='[path_to_output_file]' node matrix.js

/* 
    Data format & full function description: https://www.hackerrank.com/challenges/matrix/problem?isFullScreen=true

    Summary:
        Input format:
        - The first line of the input contains two space-separated integers,  and , the number of cities and the number of machines.
        - Each of the following  lines contains three space-separated integers, , and . There is a bidirectional road connecting  and , and to destroy this road it takes  units.
        - Each of the last  lines contains an integer, , the label of a city with a machine.
 */

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on("end", function () {
    inputString = inputString.split("\n");

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'minTime' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY roads
 *  2. INTEGER_ARRAY machines
 */

function minTime(roads, machines) {
    const { graph, roadCost } = buildGraph(roads);
    const exploredPaths = new Set();
    const destroyedRoads = new Set();
    const citiesWithMachines = new Set(machines);
    let totalCost = { val: 0 };

    for (const src of machines) {
        const minRoadCost = { val: -1, path: null, reversePath: null };

        exploreRoads(
            graph,
            new Set(),
            buildNode(src, null),
            roadCost,
            minRoadCost,
            src,
            citiesWithMachines,
            destroyedRoads,
            exploredPaths,
            totalCost
        );
    }

    return totalCost.val;
}

function exploreRoads(
    graph,
    visited,
    srcNode,
    roadCost,
    minRoadCost,
    originalSourceNode,
    citiesWithMachines,
    destroyedRoads,
    exploredPaths,
    totalCost
) {
    if (visited.has(String(srcNode.current))) return false;
    visited.add(String(srcNode.current));

    if (srcNode.prev !== null) {
        // cut roads between machines as we go
        const route = srcNode.prev.current + "," + srcNode.current;
        const reverseRoute = srcNode.current + "," + srcNode.prev.current;
        if (destroyedRoads.has(route) || destroyedRoads.has(reverseRoute)) return false;

        if (citiesWithMachines.has(srcNode.prev.current) && citiesWithMachines.has(srcNode.current)) {
            // const path = srcNode.prev.current + ',' + srcNode.current;
            destroyedRoads.add(route);
            exploredPaths.add(route);
            totalCost.val += roadCost[route];
        }

        if (
            srcNode.current !== originalSourceNode &&
            srcNode.prev.current !== originalSourceNode &&
            citiesWithMachines.has(srcNode.current)
        ) {
            const path = originalSourceNode + "," + srcNode.current;
            const { cost, cheapestPath, reverseCheapestPath } = getMinRoadCost(srcNode, roadCost);

            exploredPaths.add(path);
            if (!destroyedRoads.has(cheapestPath)) {
                destroyedRoads.add(cheapestPath);
                destroyedRoads.add(reverseCheapestPath);
                totalCost.val += cost;
            }
        }
    }

    for (const nodeVal of graph[srcNode.current]) {
        const node = buildNode(nodeVal, srcNode);
        const result = exploreRoads(
            graph,
            visited,
            node,
            roadCost,
            minRoadCost,
            originalSourceNode,
            citiesWithMachines,
            destroyedRoads,
            exploredPaths,
            totalCost
        );
        if (result === true) return true;
    }

    return false;
}

function getMinRoadCost(node, roadCost) {
    let cost = -1;
    let cheapestPath = null;
    let reverseCheapestPath = null;

    while (node.prev !== null) {
        const path = node.prev.current + "," + node.current;
        const reversePath = node.current + "," + node.prev.current;

        if (roadCost[path] < cost || cost === -1) {
            cost = roadCost[path];
            cheapestPath = path;
            reverseCheapestPath = reversePath;
        }
        node = node.prev;
    }

    return { cost, cheapestPath, reverseCheapestPath };
}

function buildNode(val, prev) {
    return { current: val, prev };
}

function buildGraph(roads) {
    const graph = {};
    const roadCost = {};

    for (const road of roads) {
        const [a, b, cost] = road;

        if (graph[a] === undefined) graph[a] = [];
        if (graph[b] === undefined) graph[b] = [];

        graph[a].push(b);
        graph[b].push(a);

        const path = a + "," + b;
        const reversePath = b + "," + a;
        roadCost[path] = cost;
        roadCost[reversePath] = cost;
    }

    return { graph, roadCost };
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    let roads = Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
        roads[i] = readLine()
            .replace(/\s+$/g, "")
            .split(" ")
            .map((roadsTemp) => parseInt(roadsTemp, 10));
    }

    let machines = [];

    for (let i = 0; i < k; i++) {
        const machinesItem = parseInt(readLine().trim(), 10);
        machines.push(machinesItem);
    }

    const result = minTime(roads, machines);

    ws.write(result + "\n");

    ws.end();
}
