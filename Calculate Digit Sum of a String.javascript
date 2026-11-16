var digitSum = function(s, k) {
    while (s.length > k) {
        let result = "";

        for (let i = 0; i < s.length; i += k) {
            let sum = 0;

            for (let j = i; j < Math.min(i + k, s.length); j++) {
                sum += Number(s[j]);
            }

            result += sum;
        }

        s = result;
    }

    return s;
};
