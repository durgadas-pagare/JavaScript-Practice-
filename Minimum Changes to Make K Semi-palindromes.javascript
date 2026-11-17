
class Solution {

    public int minimumChanges(String s, int k) {
        int n = s.length();

        int[][] cost = new int[n][n];

        // Precompute the cost of making each substring
        // a semi-palindrome.
        for (int len = 2; len <= n; len++) {
            for (int l = 0; l + len <= n; l++) {
                int r = l + len - 1;

                cost[l][r] = Integer.MAX_VALUE;

                // Try every proper divisor of substring length
                for (int d = 1; d < len; d++) {
                    if (len % d != 0) {
                        continue;
                    }

                    int changes = 0;

                    // Compare characters in each group
                    for (int start = 0; start < d; start++) {
                        int left = l + start;
                        int right = l + start
                                + ((len - 1 - start) / d) * d;

                        while (left < right) {
                            if (s.charAt(left) != s.charAt(right)) {
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

        // DP: dp[i][j] = minimum changes to divide
        // first i characters into j substrings.
        int INF = 1000000000;

        int[][] dp = new int[n + 1][k + 1];

        for (int i = 0; i <= n; i++) {
            java.util.Arrays.fill(dp[i], INF);
        }

        dp[0][0] = 0;

        for (int parts = 1; parts <= k; parts++) {
            for (int i = 2 * parts; i <= n; i++) {

                for (int j = 2 * (parts - 1); j <= i - 2; j++) {

                    if (dp[j][parts - 1] == INF) {
                        continue;
                    }

                    dp[i][parts] = Math.min(
                        dp[i][parts],
                        dp[j][parts - 1] + cost[j][i - 1]
                    );
                }
            }
        }

        return dp[n][k];
    }
}
