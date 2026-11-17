
var minimumChanges = function(s, k) {
    const n = s.length;

    const cost = Array.from(
        { length: n },
        () => Array(n).fill(Infinity)
    );

    // Precompute minimum changes for every substring
    for (let len = 2; len <= n; len++) {
        for (let l = 0; l + len <= n; l++) {
            const r = l + len - 1;

            for (let d = 1; d < len; d++) {
                if (len % d !== 0) continue;

                let changes = 0;

                for (let start = 0; start < d; start++) {
                    let left = l + start;
                    let right = l + start +
                        Math.floor((len - 1 - start) / d) * d;

                    while (left < right) {
                        if (s[left] !== s[right]) {
                            changes++;
                        }

                        left += d;
                        right -= d;
                    }
                }

                cost[l][r] = Math.min(cost[l][r], changes);
            }
        }
    }

    // Dynamic Programming
    const INF = 1e9;

    const dp = Array.from(
        { length: n + 1 },
        () => Array(k + 1).fill(INF)
    );

    dp[0][0] = 0;

    for (let parts = 1; parts <= k; parts++) {
        for (let i = 2 * parts; i <= n; i++) {
            for (let j = 2 * (parts - 1); j <= i - 2; j++) {

                if (dp[j][parts - 1] === INF) continue;

                dp[i][parts] = Math.min(
                    dp[i][parts],
                    dp[j][parts - 1] + cost[j][i - 1]
                );
            }
        }
    }

    return dp[n][k];
};
