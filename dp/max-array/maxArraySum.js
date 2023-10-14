"use strict";

/* 
    # Author : Abdulrasheed Lawal
    # Author URL : https://github.com/lawalbolaji
    # Problem URL : https://www.hackerrank.com/challenges/max-array-sum/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dynamic-programming
 */

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

function maxSubsetSum(arr) {
    let max = -Infinity;
    const memo = {};

    for (let i = 0; i < arr.length; i++) {
        const result = getMaxAdjSubsetSum(arr, i, memo);
        if (result > max) max = result;
    }

    console.log(max);
    return max;
}

function getMaxAdjSubsetSum(arr, pos, memo) {
    if (pos >= arr.length) return 0;
    if (memo[pos] !== undefined) return memo[pos];

    const result = Math.max(arr[pos] + getMaxAdjSubsetSum(arr, pos + 2, memo), getMaxAdjSubsetSum(arr, pos + 1, memo));
    memo[pos] = result;

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine()
        .split(" ")
        .map((arrTemp) => parseInt(arrTemp, 10));

    const res = maxSubsetSum(arr);

    ws.write(res + "\n");

    ws.end();
}
