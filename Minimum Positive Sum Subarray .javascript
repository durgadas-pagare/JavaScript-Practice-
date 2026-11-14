
var minimumSumSubarray = function(nums, l, r) {
    let minSum = Infinity;
    let n = nums.length;

    for (let i = 0; i < n; i++) {
        let sum = 0;


        for (let j = i; j < n; j++) {
            sum += nums[j];

            let length = j - i + 1;

            if (length >= l && length <= r && sum > 0) {
                minSum = Math.min(minSum, sum);
            }

            if (length >= r) {
                break;
            }
        }
    }

    return minSum === Infinity ? -1 : minSum;
};
