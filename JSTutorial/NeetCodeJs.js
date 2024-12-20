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

//2623. Memoize
function memoize(fn) {
    let count = 0
    let cach = {}
    return function(...args) {
        const key = JSON.stringify(args);
        if(args.length) {
           if (key in cach) {
            return cach[key]
           } else {
            count += 1
            const result = fn(...args);  // Call the function with spread arguments
            cach[key] = result;  // Store result in cache
            return result;
           }
        }
        count += 1
        return count
    }
}

//2632. Curry
var curry = function(fn) {

    return function curried(...args) {
        if(args.length == fn.length) {
            return fn(...args)
        } else {
            return function(...newArgs) {
                return curried(...args, ...newArgs)
            }
        }
    }
};

//2621. Sleep

//await only works inside an async function
//async function{} if no return it will return a promise with value undefined
async function sleep(millis) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, millis)
    })
}

//or, this will wait for the promise but return a promise with undefined
async function sleep(millis) {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, millis)
    })
}


//2637. Promise Time Limit
var timeLimit = function(fn, t) {
    return async function(...args) {
        return new Promise((resolve, reject) => {
            // will run reject function once it reaches time t
            setTimeout(() => reject("Time Limit Exceeded"), t);

            fn(...args).then((rsl) => resolve(rsl)).catch((e) => reject(e))
        });
    };
};

var timeLimit = function(fn, t) {
    return async function(...args) {
        return new Promise((resolve, reject) => {
            // will run reject function once it reaches time t
            const id = setTimeout(() => reject("Time Limit Exceeded"), t);

            fn(...args).then((rsl) => resolve(rsl)).catch((e) => reject(e))
            .finally(() => clearTimeout(id))
        });
    };
};

