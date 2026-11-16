var maxBuilding = function(n, restrictions) {
    let map = new Map();

    map.set(1, 0);
    map.set(n, n - 1);

    for (let [id, height] of restrictions) {
        map.set(id, Math.min(map.get(id) ?? Infinity, height));
    }

    let arr = Array.from(map, ([id, height]) => [id, height]);

    arr.sort((a, b) => a[0] - b[0]);

    // Left to right
    for (let i = 1; i < arr.length; i++) {
        let distance = arr[i][0] - arr[i - 1][0];

        arr[i][1] = Math.min(
            arr[i][1],
            arr[i - 1][1] + distance
        );
    }

    // Right to left
    for (let i = arr.length - 2; i >= 0; i--) {
        let distance = arr[i + 1][0] - arr[i][0];

        arr[i][1] = Math.min(
            arr[i][1],
            arr[i + 1][1] + distance
        );
    }

    let answer = 0;

    // Calculate maximum height between restrictions
    for (let i = 1; i < arr.length; i++) {
        let distance = arr[i][0] - arr[i - 1][0];

        let maxHeight = Math.floor(
            (arr[i - 1][1] + arr[i][1] + distance) / 2
        );

        answer = Math.max(answer, maxHeight);
    }

    return answer;
};
