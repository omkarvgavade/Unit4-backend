class Stack {
    constructor() {
        this.items = [];
        this.top = 0;
    }
}
Stack.prototype.push = function (a) {
    this.items[this.top] = a;
    this.top++;
}
Stack.prototype.pop = function () {
    if (this.items.length == 0) {
        return "Empty!";
    } else {
        var tempNum = this.items[this.top - 1];
        this.items.length -= 1;
        this.top--;
        return tempNum;
    }
}
Stack.prototype.peek = function () {
    if (this.items.length == 0) {
        return "Empty!";
    } else {
        return this.items[this.items.length - 1];
    }
}

let stack = new Stack;
stack.push(1)
stack.push(4)
stack.push(5)
stack.pop()
console.log(stack)
console.log(stack.peek())