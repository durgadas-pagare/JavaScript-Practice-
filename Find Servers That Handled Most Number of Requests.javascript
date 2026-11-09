
var busiestServers = function(k, arrival, load) {
    // Segment Tree: 1 means available, 0 means busy.
    const size = 2 ** Math.ceil(Math.log2(k));
    const tree = new Array(2 * size).fill(0);

    // IMPORTANT: Initially, all k servers are available.
    for (let i = 0; i < k; i++) {
        tree[size + i] = 1;
    }

    for (let i = size - 1; i >= 1; i--) {
        tree[i] = tree[2 * i] + tree[2 * i + 1];
    }

    // Update server availability.
    function update(index, value) {
        let pos = size + index;
        tree[pos] = value;

        while (pos > 1) {
            pos = Math.floor(pos / 2);
            tree[pos] = tree[2 * pos] + tree[2 * pos + 1];
        }
    }

    // Find first available server >= start.
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

            if (result !== -1) return result;

            return search(node * 2 + 1, mid + 1, right);
        }

        return search(1, 0, size - 1);
    }

    // Min Heap stores [finishTime, serverId].
    const heap = [];

    function push(item) {
        heap.push(item);
        let i = heap.length - 1;

        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);

            if (heap[parent][0] <= heap[i][0]) break;

            [heap[parent], heap[i]] = [heap[i], heap[parent]];
            i = parent;
        }
    }

    function pop() {
        const root = heap[0];
        const last = heap.pop();

        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;

            while (true) {
                const left = 2 * i + 1;
                const right = 2 * i + 2;
                let smallest = i;

                if (left < heap.length &&
                    heap[left][0] < heap[smallest][0]) {
                    smallest = left;
                }

                if (right < heap.length &&
                    heap[right][0] < heap[smallest][0]) {
                    smallest = right;
                }

                if (smallest === i) break;

                [heap[i], heap[smallest]] =
                    [heap[smallest], heap[i]];

                i = smallest;
            }
        }

        return root;
    }

    const count = new Array(k).fill(0);

    for (let i = 0; i < arrival.length; i++) {
        const time = arrival[i];

        // Release all servers that have finished.
        while (heap.length > 0 && heap[0][0] <= time) {
            const [finishTime, server] = pop();
            update(server, 1);
        }

        // All servers are busy.
        if (tree[1] === 0) continue;

        const start = i % k;

        // Search from the preferred server.
        let server = findFirst(start);

        // Wrap around and search from server 0.
        if (server === -1) {
            server = findFirst(0);
        }

        // Assign the request.
        count[server]++;
        update(server, 0);

        push([time + load[i], server]);
    }

    // Find the maximum number of requests handled.
    let maxRequests = 0;

    for (const value of count) {
        maxRequests = Math.max(maxRequests, value);
    }

    const result = [];

    for (let i = 0; i < k; i++) {
        if (count[i] === maxRequests) {
            result.push(i);
        }
    }

    return result;
};
