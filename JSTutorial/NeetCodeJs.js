//2620. Counter
var createCounter = function(n) {
    count = 0
    return function() {
        n += count
        count = 1
        return n
    };
};

class Counter {
    constructor(n) {
        this.n = n
    }
    increment() {
        this.n = this.n + 1
    }
}

//2665. Counter II
var createCounter = function(init) {
    let current = init
    return {
        increment: () => {
            current += 1
            return current
        },
        decrement: () => {
            current -= 1
            return current
        },
        reset: () => {
            current = init
            return current
        }
    }
};

//2635. Apply Transform Over Each Element in Array
var map = function(arr, fn) {
    let rslt = []
    for(let i in arr) {
        rslt.push(fn(arr[i], Number(i)))
    }
    return rslt
};

//2629. Function Composition
var compose = function(functions) {

    return function(x) {
        for (let i = functions.length - 1; i >= 0; i--) {
            let func = functions[i]
            x = func(x)
        }
        return x
    }
};

//2666. Allow One Function Call
var once = function(fn) {
    let once = false
    return function(...args){
        if (!once) {
            once = true
            return fn(...args)
        }
        return undefined
    }
};
