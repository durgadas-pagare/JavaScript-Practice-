
var processStr = function(s, k) {
    let len = 0n;
    let kBig = BigInt(k);

    // Step 1: Calculate final length
    for (let ch of s) {
        if (ch === '*') {
            if (len > 0n) len--;
        }
        else if (ch === '#') {
            len *= 2n;
        }
        else if (ch !== '%') {
            len++;
        }
    }

    // Step 2: Check bounds
    if (kBig >= len) {
        return ".";
    }

    // Step 3: Traverse backwards
    for (let i = s.length - 1; i >= 0; i--) {
        let ch = s[i];

        if (ch === '*') {
            len++;
        }
        else if (ch === '#') {
            len /= 2n;

            if (kBig >= len) {
                kBig -= len;
            }
        }
        else if (ch === '%') {
            kBig = len - 1n - kBig;
        }
        else {
            len--;

            if (kBig === len) {
                return ch;
            }
        }
    }

    return ".";
};
