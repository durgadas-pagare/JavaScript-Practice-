
/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
var countServers = function(n, logs, x, queries) {
    logs.sort((a, b) => a[1] - b[1]);

    let sortedQueries = queries.map((q, i) => [q, i]);
    sortedQueries.sort((a, b) => a[0] - b[0]);

    let result = new Array(queries.length).fill(0);
    let serverCount = new Map();

    let left = 0;
    let right = 0;

    for (let [q, index] of sortedQueries) {
        let start = q - x;

        while (right < logs.length && logs[right][1] <= q) {
            let id = logs[right][0];
            serverCount.set(id, (serverCount.get(id) || 0) + 1);
            right++;
        }

        while (left < right && logs[left][1] < start) {
            let id = logs[left][0];
            serverCount.set(id, serverCount.get(id) - 1);

            if (serverCount.get(id) === 0) {
                serverCount.delete(id);
            }

            left++;
        }

        result[index] = n - serverCount.size;
    }

    return result;
};
