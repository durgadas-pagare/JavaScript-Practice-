
var busiestServers = function(k, arrival, load) {
    const size = 2 ** Math.ceil(Math.log2(k));
    const tree = new Array(2 * size).fill(0);

    // Initially, every server is available.
    function update(index, value) {
        index += size;
        tree[index] = value;

        while (index > 1) {
            index = Math.floor(index / 2);
            tree[index] = tree[index * 2] + tree[index * 2 + 1];
        }
    }

    // Find the first available server at or after start.
    function findFirst(start) {
        function search(node, left, right) {
            if (right < start || tree[node] === 0) {
                return -1;
            }

            if (left === right) {
                return left < k ? left : -1;
            }

            const mid = Math.floor((left + right) / 2);

            let result = search(node * 2, left, mid);

            if (result !== -1) {
                return result;
            }

            return search(node * 2 + 1, mid + 1, right);
        }

        return search(1, 0, size - 1);
    }

    const busy = [];
    const count = new Array(k).fill(0);

    for (let i = 0; i < arrival.length; i++) {
        const time = arrival[i];

        // Release servers whose requests have finished.
        while (busy.length > 0 && busy[0][0] <= time) {
            const [endTime, server] = busy.shift();
            update(server, 1);
        }

        // Find the next available server.
        const start = i % k;
        let server = findFirst(start);

        if (server === -1) {
            server = findFirst(0);
        }

        // Drop request if all servers are busy.
        if (server === -1) {
            continue;
        }

        count[server]++;
        update(server, 0);

        busy.push([time + load[i], server]);
        busy.sort((a, b) => a[0] - b[0]);
    }

    const maxRequests = Math.max(...count);
    const result = [];

    for (let i = 0; i < k; i++) {
        if (count[i] === maxRequests) {
            result.push(i);
        }
    }

    return result;
};
