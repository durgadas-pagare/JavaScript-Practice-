
var climbStairs = function(n, costs) {
    // Minimum cost to reach the previous three steps.
    let a = 0;
    let b = Infinity;
    let c = Infinity;

    for (let i = 1; i <= n; i++) {
        let current = Infinity;

        // Jump from step i - 1.
        current = Math.min(current, a + 1 + costs[i - 1]);

        // Jump from step i - 2.
        current = Math.min(current, b + 4 + costs[i - 1]);

        // Jump from step i - 3.
        current = Math.min(current, c + 9 + costs[i - 1]);

        // Move the previous three states forward.
        a = b;
        b = c;
        c = current;
    }

    return c;
};
