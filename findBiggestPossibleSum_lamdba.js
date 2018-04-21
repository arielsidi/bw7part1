/**
 * Finds the biggest possible sum for the given list and pairs.
 * 
 * @param {array} list - List of integer values to sum. Negative values are allowed.
 * @param {array} pairs - List with pairs. For pairs set the index of the paired element. For single elements set as null.
 * @returns {number} - result of the sum.
 * 
 * @throws {InvalidArgumentType} - Arguments 'list' and 'pairs' must be of type Array.
 * @throws {InvalidArrayLength} - Arguments 'list' and 'pairs' lengths must match.
 * @throws {InvalidArgument} - Argument 'list' must contain Integer values.
 * @throws {InvalidArgument} - Argument 'pairs' must contain null or a valid index for argument 'list'.
 * @throws {InvalidArgument} - Argument 'pairs' contains inconsistent values.
 * 
 */
exports.handler = async function(event, context) {
    var list = event.list;
    var pairs = event.pairs;
    
    class InvalidArgumentError extends Error {
        constructor(name, message) {
            super(message);
            this.message = message;
        }
    }
    if (list.constructor !== Array || pairs.constructor !== Array) {
        throw new InvalidArgumentError("InvalidArgumentType", "Arguments 'list' and 'pairs' must be of type Array.");
    }
    if (list.length !== pairs.length) {
        throw new InvalidArgumentError("InvalidArrayLength", "Arguments 'list' and 'pairs' lengths must match.");
    }
    if (list.some((element, index, array) => {
        return !Number.isInteger(element);
    })) {
        throw new InvalidArgumentError("InvalidArgument", "Argument 'list' must contain Integer values.");
    }
    if (pairs.some((element, index, array) => {
        return !(element === null || (Number.isInteger(element) && element >= 0 && element < list.length));
    })) {
        throw new InvalidArgumentError("InvalidArgument", "Argument 'pairs' must contain null or a valid index for argument 'list'");
    }
    if (pairs.some((element, index, array) => {
        return !((element === null || pairs[element] == index) && element !== index);
    })) {
        throw new InvalidArgumentError("InvalidArgument", "Argument 'pairs' contains inconsistent values.");
    }

    var added = Array(list.length).fill(false);
    var sum = 0;
    for (let i = 0; i < list.length; i++) {
        if (!added[i]) {

            let elementSum = list[i];
            added[i] = true;
            if (pairs[i] !== null) {
                elementSum *= list[pairs[i]];
                added[pairs[i]] = true;
            }
            if (elementSum > 0) {
                sum += elementSum;
            }
        }
    }
    return sum;
}