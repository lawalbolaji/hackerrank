"use strict";

const fs = require("fs");
const util = require("util");

process.stdin.resume();
process.stdin.setEncoding("ascii");

let inputString = "";
let currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

process.stdin.on("data", function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on("end", function () {
    inputString = inputString.split("\n");

    main();
});

function shortestReachIngraph(nodes, edgeList, startNode) {
    const graph = buildGraph(edgeList, nodes);
    const nodeDistance = {};
    const result = [];

    // console.log(graph)

    const queue = [[startNode, 0]];
    const visited = new Set();

    while (queue.length > 0) {
        const [current, distance] = queue.shift();

        if (visited.has(String(current))) continue;
        visited.add(String(current));

        if (nodeDistance[current] === undefined) nodeDistance[current] = distance;
        else if (distance < nodeDistance[current]) nodeDistance[current] = distance;

        for (const el of graph[current]) {
            queue.push([el, distance + 1]);
        }
    }

    for (let i = 1; i <= nodes; i++) {
        if (i === startNode) continue;

        if (nodeDistance[i] !== undefined) {
            result.push(nodeDistance[i] * 6);
            continue;
        }

        result.push(-1);
    }

    return result;
}

function buildGraph(edgeList, nodes) {
    const graph = {};

    for (let i = 1; i <= nodes; i++) {
        graph[i] = new Set();
    }

    for (const edge of edgeList) {
        const [a, b] = edge;

        graph[a].add(b);
        graph[b].add(a);
    }

    for (let i = 1; i <= nodes; i++) {
        graph[i] = Array.from(graph[i]);
    }

    return graph;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let numQueries = readLine().replace(/\s+$/g, "");
    while (numQueries > 0) {
        let [nodes, edges] = readLine().replace(/\s+$/g, "").split(" ");

        const edgeList = [];
        while (edges > 0) {
            edgeList.push(readLine().replace(/\s+$/g, "").split(" "));
            edges -= 1;
        }

        const startNode = +readLine().replace(/\s+$/g, "");
        const result = shortestReachIngraph(nodes, edgeList, startNode);
        ws.write(result.join(" ") + "\n");
        numQueries -= 1;
    }

    ws.end();
}
