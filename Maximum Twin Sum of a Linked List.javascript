
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function(head) {
    let slow = head;
    let fast = head;

    // Find the middle of the linked list
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse the second half
    let prev = null;
    let curr = slow;

    while (curr !== null) {
        let nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }

    // Calculate maximum twin sum
    let maxSum = 0;
    let first = head;
    let second = prev;

    while (second !== null) {
        let sum = first.val + second.val;

        maxSum = Math.max(maxSum, sum);

        first = first.next;
        second = second.next;
    }

    return maxSum;
};
