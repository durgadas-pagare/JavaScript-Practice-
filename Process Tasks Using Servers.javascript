
var assignTasks = function(servers, tasks) {
    const n = servers.length;
    const m = tasks.length;

    // Generic Min Heap
    class MinHeap {
        constructor(compare) {
            this.heap = [];
            this.compare = compare;
        }

        size() {
            return this.heap.length;
        }

        peek() {
            return this.heap[0];
        }

        push(value) {
            this.heap.push(value);
            let i = this.heap.length - 1;

            while (i > 0) {
                const parent = Math.floor((i - 1) / 2);

                if (this.compare(this.heap[parent], this.heap[i]) <= 0) {
                    break;
                }

                [this.heap[parent], this.heap[i]] =
                    [this.heap[i], this.heap[parent]];

                i = parent;
            }
        }

        pop() {
            const result = this.heap[0];
            const last = this.heap.pop();

            if (this.heap.length > 0) {
                this.heap[0] = last;
                let i = 0;

                while (true) {
                    let smallest = i;
                    const left = 2 * i + 1;
                    const right = 2 * i + 2;

                    if (
                        left < this.heap.length &&
                        this.compare(this.heap[left], this.heap[smallest]) < 0
                    ) {
                        smallest = left;
                    }

                    if (
                        right < this.heap.length &&
                        this.compare(this.heap[right], this.heap[smallest]) < 0
                    ) {
                        smallest = right;
                    }

                    if (smallest === i) break;

                    [this.heap[i], this.heap[smallest]] =
                        [this.heap[smallest], this.heap[i]];

                    i = smallest;
                }
            }

            return result;
        }
    }

    // Available servers: [weight, index]
    const available = new MinHeap((a, b) =>
        a[0] - b[0] || a[1] - b[1]
    );

    // Busy servers: [finishTime, index]
    const busy = new MinHeap((a, b) =>
        a[0] - b[0] || a[1] - b[1]
    );

    // Initially, all servers are available.
    for (let i = 0; i < n; i++) {
        available.push([servers[i], i]);
    }

    const ans = [];
    let time = 0;

    for (let i = 0; i < m; i++) {
        // Task i arrives at second i.
        time = Math.max(time, i);

        // Release servers that have finished.
        while (busy.size() > 0 && busy.peek()[0] <= time) {
            const [finishTime, index] = busy.pop();
            available.push([servers[index], index]);
        }

        // If no server is free, wait for the earliest one.
        if (available.size() === 0) {
            time = busy.peek()[0];

            // Release every server finishing at this time.
            while (busy.size() > 0 && busy.peek()[0] <= time) {
                const [finishTime, index] = busy.pop();
                available.push([servers[index], index]);
            }
        }

        // Choose the server with smallest weight, then index.
        const [weight, serverIndex] = available.pop();

        ans.push(serverIndex);

        // Server becomes free after processing this task.
        busy.push([time + tasks[i], serverIndex]);
    }

    return ans;
};
