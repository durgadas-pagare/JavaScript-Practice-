
/**
 * @param {string[]} words
 * @param {number[]} weights
 * @return {string}
 */
var mapWordWeights = function(words, weights) {
    let result = "";

    for (let word of words) {
        let sum = 0;

        for (let char of word) {
            sum += weights[char.charCodeAt(0) - 97];
        }

        let remainder = sum % 26;

        let mappedChar = String.fromCharCode(122 - remainder);

        result += mappedChar;
    }

    return result;
};
