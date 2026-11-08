
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function(head) {
    // If the list has only one node
    if (head === null || head.next === null) {
        return null;
    }

    let slow = head;
    let fast = head;
    let prev = null;

    // Find the middle node
    while (fast !== null && fast.next !== null) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // Delete the middle node
    prev.next = slow.next;

    return head;
};
