"use strict";

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
 * Complete the 'roadsAndLibraries' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER c_lib
 *  3. INTEGER c_road
 *  4. 2D_INTEGER_ARRAY cities
 */

function roadsAndLibraries(n, c_lib, c_road, cities) {
    if (c_road > c_lib) return c_lib * n; // solving for nr - r < nl - l establishes this

    const graph = buildGraph(cities, n);
    const visited = new Set();

    // we know that we need to build at least one library for every isolated graph
    const roads = [];
    for (const node in graph) {
        roads.push(exploreGraph(graph, node, visited));
    }

    let minCost = 0;
    roads.forEach((road) => {
        if (road === 0) return;

        if (road === 1) {
            minCost += c_lib;
        } else {
            minCost += (road - 1) * c_road + c_lib;
        }
    });

    return minCost;
}

function exploreGraph(graph, node, visited) {
    if (visited.has(String(node))) return 0;

    visited.add(String(node));
    let count = 1;

    for (const element of graph[node]) {
        count += exploreGraph(graph, element, visited);
    }

    return count;
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

    for (let i = 1; i <= n; i++) {
        if (!(String(i) in graph)) {
            graph[i] = [];
        }
    }

    return graph;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const c_lib = parseInt(firstMultipleInput[2], 10);

        const c_road = parseInt(firstMultipleInput[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine()
                .replace(/\s+$/g, "")
                .split(" ")
                .map((citiesTemp) => parseInt(citiesTemp, 10));
        }

        const result = roadsAndLibraries(n, c_lib, c_road, cities);

        ws.write(result + "\n");
    }

    ws.end();
}
