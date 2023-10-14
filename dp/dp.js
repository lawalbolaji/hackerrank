// const map = {};

// function fib(n) {
//     if (n === 0 || n === 1) return n;
//     if (map[n] !== undefined) return map[n];

//     const result = fib(n - 1) + fib(n - 2);

//     map[n] = result;
//     return result;
// }

// console.log(fib(100));

// (() => {
//     function tribonacci(n, memo) {
//         if (n === 0 || n === 1) return 0;
//         if (n === 2) return 1;

//         if (memo[n] !== undefined) return memo[n];

//         const result = tribonacci(n - 1, memo) + tribonacci(n - 2, memo) + tribonacci(n - 3, memo);

//         memo[n] = result;
//         return result;
//     }

//     console.log(tribonacci(35, {}));
// })();

// (() => {
//     function sumPossible(nums, sum, memo) {
//         if (sum < 0) return false;
//         if (sum === 0) return true;

//         let key = sum + "," + nums.join(",");
//         // if (memo[key] !== undefined) return memo[key];

//         while (nums.length > 0) {
//             const num = nums.shift();
//             if (sumPossible(nums, sum - num, memo)) {
//                 // memo[key] = true;
//                 return true;
//             }
//         }

//         // memo[key] = false;
//         return false;
//     }

//     console.log(
//         sumPossible(
//             [
//                 1, 2, 3, 17, 19, 21, 91, 88, 76, 65, 64, 63, 73, 82, 22, 34, 11, 25, 67, 88, 4, 5, 6, 7, 8, 9, 10, 11,
//                 12, 13, 14, 15, 16, 17, 18, 19, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40,
//             ],
//             950,
//             {}
//         )
//     );
// })();

// (() => {
//     function minCoin(amount, coins, memo) {
//         if (amount < 0) return Infinity;
//         if (amount === 0) return 0;

//         if (memo[amount] !== undefined) return memo[amount];

//         let minCoins = -1;
//         for (const coin of coins) {
//             const subAmount = amount - coin;
//             const subCoin = minCoin(subAmount, coins, memo);

//             if (subCoin + 1 < minCoins || minCoins === -1) {
//                 minCoins = subCoin + 1;
//             }
//         }

//         memo[amount] = minCoins;
//         return minCoins;
//     }

//     console.log(minCoin(4, [1, 2, 3], {}));
// })();

(() => {
    function maxPathSum() {
        
    }
})();