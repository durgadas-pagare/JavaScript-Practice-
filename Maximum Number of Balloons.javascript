
var maxNumberOfBalloons = function(text) {

    let count = {};

    for (let ch of text) {
        count[ch] = (count[ch] || 0) + 1;
    }

    return Math.min(
        count['b'] || 0,
        count['a'] || 0,
        Math.floor((count['l'] || 0) / 2),
        Math.floor((count['o'] || 0) / 2),
        count['n'] || 0
    );
};
