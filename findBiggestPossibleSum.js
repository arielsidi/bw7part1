

/**
 * Finds the biggest possible sum for the given array by multiplying pairs.
 * 
 * @param {array} list - List of integer values to sum. Negative values are allowed.
 * @returns {number} - result of the sum.
 * 
 * @throws {InvalidArgumentType} - Arguments 'list' and 'pairs' must be of type Array.
 * @throws {InvalidArgument} - Argument 'list' must contain Integer values.
 */
function findBiggestPossibleSum(list) {
    class InvalidArgumentError extends Error {
        constructor(name, message) {
            super(message);
            this.message = message;
        }
    }
    if (list.constructor !== Array) {
        throw new InvalidArgumentError("InvalidArgumentType", "Argument 'list' must be of type Array.");
    }
    if (list.some((element, index, array) => {
        return !Number.isInteger(element);
    })) {
        throw new InvalidArgumentError("InvalidArgument", "Argument 'list' must contain Integer values.");
    }

    var sortedList = list.sort( (a, b) => { return b - a; });
    var higherThanOneList = sortedList.filter((x) => { return x > 1; });
    var onesList = list.filter((x) => { return x == 1; });
    var lowerThanOneList = sortedList.filter((x) => { return x < 1; });

    /*
     * list length must be even
     */
    var multiplyPairs = (list) => {
        let sum = 0;
        for (let i = 1; i < list.length; i += 2) {
            sum += list[i - 1] * list[i];
        }
        return sum;
    }

    // Sume Ones
    var sum = onesList.length;

    // Sum Positives
    if (higherThanOneList.length % 2 == 1) {
        higherThanOneList.push(1);
    }
    sum += multiplyPairs(higherThanOneList);

    // Sum Negatives
    if (lowerThanOneList.length % 2 == 1) {
        sum += lowerThanOneList.shift();
    }
    sum += multiplyPairs(lowerThanOneList.reverse());

    return sum;
}

console.log('test1', findBiggestPossibleSum(
    [0, 1, 2, 3, 4, 5]) == 27);

console.log('test2', findBiggestPossibleSum(
    [-1, 0, 1]) == 1);

console.log('test3', findBiggestPossibleSum(
    [1, 1]) == 2);

console.log('test4', findBiggestPossibleSum(
    [0, 1, 2, 3, -4, -5]) == 27);

console.log('test5', findBiggestPossibleSum(
    [0, 1, 2, 3, 4, -5]) == 15);

console.log('test6', findBiggestPossibleSum(
    [2, 0, 2, 3, 4, 5]) == 28);

console.log('test7', findBiggestPossibleSum(
    [2, 0, 2, 3, 4, 5]) == 28);

console.log('test8', findBiggestPossibleSum(
    [-2, 0, 2, -3, 4, -5]) == 23);

console.log('test9', findBiggestPossibleSum(
    [-1, 0, 2, -1, 4, 1, 1]) == 11);

console.log('test10', findBiggestPossibleSum(
    [-1, 0, 2, -3, -4, -10, 1]) == 46);

console.log('test11', findBiggestPossibleSum(
    [-2, -4, -3]) == 10);

console.log('test12', findBiggestPossibleSum(
    [-2]) == -2);

console.log('test13', findBiggestPossibleSum(
    [3]) == 3);

console.log('test14', findBiggestPossibleSum(
    [0]) == 0);

console.log('test15', findBiggestPossibleSum(
    [0, 0, 0]) == 0);

console.log('test16', findBiggestPossibleSum(
    [3, 4, 5]) == 23);

console.log('test17', findBiggestPossibleSum(
    [1, 1, 5]) == 7);

console.log('test18', findBiggestPossibleSum(
    [1, -10, 0]) == 1);

console.log('test19', findBiggestPossibleSum(
    [1, -1, 1, 1]) == 2);

console.log('test20', findBiggestPossibleSum(
    []) == 0);

console.log('test21', findBiggestPossibleSum(
    [-1, 0, 2, -3, -4, -10, 1, -5]) == 65);