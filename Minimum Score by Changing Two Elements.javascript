
var minimizeSum = function(nums) {
    const n = nums.length;

    if (n <= 3) {
        return 0;
    }

    nums.sort((a, b) => a - b);

    let ans = Infinity;

    // Case 1: Change two smallest elements
    ans = Math.min(ans, nums[n - 1] - nums[2]);

    // Case 2: Change two largest elements
    ans = Math.min(ans, nums[n - 3] - nums[0]);

    // Case 3: Change smallest and largest elements
    ans = Math.min(ans, nums[n - 2] - nums[1]);

    return ans;
};
