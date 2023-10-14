"use strict";

const fs = require("fs");

/* 
    # Author : Abdulrasheed Lawal
    # Author URL : https://github.com/lawalbolaji
    # Problem URL : https://www.hackerrank.com/challenges/abbr/problem?h_l=interview&isFullScreen=true&playlist_slugs%5B%5D%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D%5B%5D=dynamic-programming
 */

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
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function abbreviation(a, b) {
    const memo = new Map();
    const result = isAbMatch(a, b, 0, 0, memo);

    console.log("------");

    return result ? "YES" : "NO";
}

function isAbMatch(src, target, i, j, memo) {
    if (i === src.length) {
        if (j === target.length) {
            return true;
        }

        return false;
    }

    const cacheKey = i + ":" + j;
    if (memo[cacheKey] !== undefined) return memo[cacheKey];

    if (j === target.length) {
        return src[i] !== src[i].toUpperCase() && isAbMatch(src, target, i + 1, j, memo);
    }

    const upperChar = src[i].toUpperCase();
    if (upperChar === src[i]) {
        memo[cacheKey] = upperChar === target[j] && isAbMatch(src, target, i + 1, j + 1, memo);
        return memo[cacheKey];
    }

    memo[cacheKey] =
        isAbMatch(src, target, i + 1, j, memo) ||
        (upperChar === target[j] && isAbMatch(src, target, i + 1, j + 1, memo));
    return memo[cacheKey];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const a = readLine();

        const b = readLine();

        const result = abbreviation(a, b);

        ws.write(result + "\n");
    }

    ws.end();
}
