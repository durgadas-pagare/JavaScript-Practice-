var maxIceCream = function(costs, coins) {
    let maxCost = Math.max(...costs);

    // Create frequency array
    let count = new Array(maxCost + 1).fill(0);

    // Count occurrences of each cost
    for (let cost of costs) {
        count[cost]++;
    }

    let answer = 0;

    // Buy cheapest ice cream bars first
    for (let cost = 0; cost <= maxCost; cost++) {
        while (count[cost] > 0 && coins >= cost) {
            coins -= cost;
            answer++;
            count[cost]--;
        }
    }

    return answer;
};
