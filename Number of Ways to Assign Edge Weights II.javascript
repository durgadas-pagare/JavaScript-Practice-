
/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var assignEdgeWeights = function(edges, queries) {
    const MOD = 1000000007;
    const n = edges.length + 1;

    // Build adjacency list
    const adj = Array.from({ length: n + 1 }, () => []);

    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // Binary lifting setup
    const LOG = Math.ceil(Math.log2(n)) + 1;

    const up = Array.from(
        { length: LOG },
        () => new Array(n + 1).fill(0)
    );

    const depth = new Array(n + 1).fill(0);

    // Iterative DFS
    const stack = [1];
    const visited = new Array(n + 1).fill(false);
    visited[1] = true;

    while (stack.length > 0) {
        const u = stack.pop();

        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                depth[v] = depth[u] + 1;
                up[0][v] = u;
                stack.push(v);
            }
        }
    }

    // Build binary lifting table
    for (let k = 1; k < LOG; k++) {
        for (let v = 1; v <= n; v++) {
            up[k][v] = up[k - 1][up[k - 1][v]];
        }
    }

    // Find Lowest Common Ancestor
    function lca(u, v) {
        if (depth[u] < depth[v]) {
            [u, v] = [v, u];
        }

        let diff = depth[u] - depth[v];

        for (let k = 0; k < LOG; k++) {
            if ((diff >> k) & 1) {
                u = up[k][u];
            }
        }

        if (u === v) return u;

        for (let k = LOG - 1; k >= 0; k--) {
            if (up[k][u] !== up[k][v]) {
                u = up[k][u];
                v = up[k][v];
            }
        }

        return up[0][u];
    }

    // Precompute powers of 2
    const pow2 = new Array(n + 1).fill(1);

    for (let i = 1; i <= n; i++) {
        pow2[i] = (pow2[i - 1] * 2) % MOD;
    }

    // Answer queries
    const answer = [];

    for (const [u, v] of queries) {
        const ancestor = lca(u, v);

        const distance =
            depth[u] + depth[v] - 2 * depth[ancestor];

        if (distance === 0) {
            answer.push(0);
        } else {
            answer.push(pow2[distance - 1]);
        }
    }

    return answer;
};
