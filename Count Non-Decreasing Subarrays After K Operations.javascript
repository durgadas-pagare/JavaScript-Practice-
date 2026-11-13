
var countNonDecreasingSubarrays = function(nums, k) {
    const n = nums.length;

    // Prefix sums for fast range-sum calculation.
    const prefix = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    // Cost of raising nums[left...right] to nums[left].
    function getCost(left, right) {
        return (right - left + 1) * nums[left]
            - (prefix[right + 1] - prefix[left]);
    }

    // Each deque entry is [left, right].
    // Entries represent blocks of elements.
    const deque = [];

    let head = 0;
    let cost = 0;
    let right = n - 1;
    let answer = 0;

    // Process the array from right to left.
    for (let left = n - 1; left >= 0; left--) {
        let blockRight = left;

        // Merge blocks whose maximum is <= nums[left].
        while (
            deque.length > head &&
            nums[deque[deque.length - 1][0]] <= nums[left]
        ) {
            const block = deque.pop();

            cost -= getCost(block[0], block[1]);

            blockRight = block[1];
        }

        // Add the new block.
        cost += getCost(left, blockRight);
        deque.push([left, blockRight]);

        // Shrink the window while its cost exceeds k.
        while (cost > k) {
            const front = deque[head];

            cost -= nums[front[0]] - nums[front[1]];

            front[1]--;

            if (front[1] < front[0]) {
                head++;
            }

            right--;
        }

        // All subarrays [left...right], [left...right-1], etc.
        // within the valid window are counted.
        answer += right - left + 1;
    }

    return answer;
};
