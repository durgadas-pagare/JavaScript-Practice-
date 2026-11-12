
var processStr = function(s) {
    let result = "";

    for (let ch of s) {

        if (ch >= 'a' && ch <= 'z') {
            result += ch;
        }

        else if (ch === '*') {
            result = result.slice(0, -1);
        }

        else if (ch === '#') {
            result += result;
        }

        else if (ch === '%') {
            result = result.split('').reverse().join('');
        }
    }

    return result;
};
