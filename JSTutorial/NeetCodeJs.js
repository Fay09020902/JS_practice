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
            //cleartimeout
        });
    };
};

//2636. Promise Pool
//wrong my approach
var promisePool = async function(functions, n) {
    let queue = []
    let index_next = 0
    for (let i = 0; i < n && index_next < functions.length; i++) {
        let promise = functions[index_next]()
        index_next += 1
        queue.push(promise)
        //if promise in the queue get resolved, then move it out from queue
        promise.then(() => queue.splice(queue.indexOf(promise), 1))
    }

    while (queue.length > 0 || index_next < functions.length) {
        if (queue.length < n && index_next <   functions.length) {
            let promise = functions[index_next++]();
            queue.push(promise);

            // Remove resolved promises from the queue
            promise.then(() => queue.splice(queue.indexOf(promise), 1));
        }

    }
    //cannot make sure all the pending promises got resolved
    return Promise.resolve()
};

//2627. Debounce
var debounce = function(fn, t) {
    //call first one, and if next call called within t from the first call, cancel the first call, otherwise keep first one and call second one
    let id
    return function(...args) {
        clearTimeout(id) //if alreay been executed, this would not do anything
        id = setTimeout(() => fn(...args), t);
    }
};



//2628. JSON Deep Equal
var areDeeplyEqual = function(o1, o2) {
    if(o1 === null || o2 === null) {
        return o1 === o2
    }
    if((typeof o1) !== (typeof o2)) {
        return false
    }
    if (typeof o1 !== 'object') {
        return o1 === o2
    }
    if(Array.isArray(o1) && Array.isArray(o2)) {
        if (o1.length !== o2.length) {
            return false;
        }

        for (let i = 0; i < o1.length; i++) {
            if (!areDeeplyEqual(o1[i], o2[i])) {
                return false;
            }
        }
        return true;
    }

    if (typeof o1 === "object"  && typeof o2 === "object") {
        if (Array.isArray(o1) || Array.isArray(o2)) {
            return false;
        }
        const keys1 = Object.keys(o1);
        const keys2 = Object.keys(o2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (let key of keys1) {
            if (!keys2.includes(key) || !areDeeplyEqual(o1[key], o2[key])) {
                return false;
            }
        }
        return true
        //wrong  you need to ensure that all key-value pairs are checked and accumulated before returning the final result. This can be done by using a flag or returning false only if a mismatch is found.

        // for (let key of keys1) {
        //     if (keys2.includes(key)) {
        //         return areDeeplyEqual(o1[key], o2[key])
        //     } else {
        //         return false
        //     }
        // }
    }
};
