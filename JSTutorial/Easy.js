//1.implement curry()
function curry(fn) {
  return function middle(...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return middle.bind(null, ...args)
    }
  }
}

//second way
function curry(fn) {
  // Return a function to start the currying process
  return function inner(...args) {
    // Check if we have enough arguments to call the function
    if (args.length >= fn.length) {
      // If enough arguments, call the original function
      return fn(...args);
    } else {
      // Otherwise, return a new function that binds the next arguments
      // `bind` will return a new function that can be called again with more arguments
      return inner.bind(null, ...args);
    }
  };
}

//mo bind
function curry(fn) {
  // Return a function to start the currying process
  return function inner(...args) {
    // Check if we have enough arguments to call the function
    if (args.length >= fn.length) {
      // If enough arguments, call the original function
      return fn(...args);
    } else {
      return function(...args1) {
        return inner(...args, ...args1)
      }
    }
  };
}

//Now you call the previously bound function with (2, 3).
//Calling a bound function with extra arguments appends those
// new arguments to the previously bound ones. In other words:
//Initially: The bound function had [1] as pre-set arguments.
//Now you invoke it with (2, 3).
//Internally, this results in calling middle with [1, 2, 3].


//method 2
function curry(fn) {
  return function middle(...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return (args2) => {
        return middle(...args, args2)
      }
    }
  }
}

// 11. what is Composition? create a pipe()
function pipe(funcs) {
    // Return a function that takes `x` as input
    return function(x) {
      // Use reduce to apply all functions in the pipeline
      return funcs.reduce((prev, cur) => {
        return cur(prev); // Apply the current function to the result of the previous one
      }, x); // Start with the initial value `x`
    };
}

//method 2
function pipe(funcs) {
	return x => {
			let rslt = x
			for (let func of funcs) {
				rslt = func(rslt)
			}
			return rslt
	}
}



// 18. Improve a function
function excludeItems(items, excludes) {
    let excludeMap = new Map()
    //the new map stucture will be like {'color': set('silver', 'gold')} {'type': set('','')}
    for (let {k, v} of excludes) {
      //k is 'color, v is 'silver'
      if(!excludeMap.has(k)){
         excludeMap.set(k, new Set([v]))
      }
      excludeMap.get(k).add(v);
    }
    items = items.filter(item => {
      //[[color, 'red'], [type, 'tv]]
      //apply to each pair: if the key not in exclude or the item not in exclude, return true
      //if all pair results are true, returns true, otherwise false.
      return Object.entries(item).every(([key, val]) => {
        return !excludeMap.has(key) || !excludeMap.get(key).has(val)
      })
    })
    return items
  }

  //8. can you shuffle() an array?
  function shuffle(arr) {
    // modify the arr inline to change the order randomly
  //   Begin at the last index of the array (in this case, index 3 for the element 4).
  // Generate a random integer r between 0 and the current index (inclusive).
  // Swap the element at the current index with the element at index r.
  // Move one position forward (i.e., decrement the index) and repeat the random selection and swap steps until you've passed through the entire array.
    for (let i = arr.length - 1; i >0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr
  }

  //9
  //wrong

  function decode(message) {
    let rsl
    let col_len = message[0].length - 1
    let row_len = message.length - 1
    let [x, y] = [0, 0]
    let sign = -1
    while(x <= col_len) {
      rsl += message[y][x]
      if (y === 0) {
        y += 1
        sign = 1;
      } else if(y === row_len){
        y -= 1
        sign = -1
      } else {
        y = y + sign
      }
      x += 1
    }
    return rsl
  }

  function decode(message) {
    let rsl = ''; // Initialize the result string as an empty string
    let col_len = message[0].length - 1; // Last column index
    let row_len = message.length - 1; // Last row index
    let [x, y] = [0, 0]; // Starting coordinates
    let sign = -1; // Used to change direction (up or down)

    while (x <= col_len) {
      rsl += message[y][x]; // Add current character to the result string

      // Check if we need to change direction (either top or bottom row)
      if (y + sign < 0 || y + sign > row_len) {
        sign *= -1; // Reverse direction
      }

      y += sign; // Move up or down
      x += 1; // Move right
    }

    return rsl;
  }


  //10. first bad version
  function firstBadVersion(isBad) {
    // firstBadVersion receive a check function isBad
    // and should return a closure which accepts a version number(integer)
    return (version) => {
      // write your code to return the first bad version
      // if none found, return -1
      let low = 0;
      let high = version;

      while(low < high) {
        let middle = Math.floor((low + high) / 2);
        if(isBad(middle)) {
          high = middle
        } else {
          low = middle + 1
        }
      }
      return isBad(high) ? high : -1; // Check if a bad version exists
    }
  }


//13. Implement a Queue by using Stack
//wrong answer due to the peek not using while
class Queue {
  constructor() {
    this.inputStack = new Stack()
    this.outputStack = new Stack()
  }
  enqueue(element) {
    this.inputStack.push(element)
  }
  peek() {
    if(!this.outputStack.size()) {
      for(let i = 0; i < this.inputStack.size(); i++) {
        let last_ele = this.inputStack.pop()
        this.outputStack.push(last_ele)
        }
    }
    return this.outputStack.peek()
  }
  size() {
    // return count of element
    return this.inputStack.size() + this.outputStack.size();
  }
  dequeue() {
    if (this.outputStack.size() === 0) {
      // Transfer elements from inputStack to outputStack
      while (this.inputStack.size() > 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }
    return this.outputStack.pop();
  }
}





// Your implementation of the peek method contains a subtle bug: the loop condition in peek assumes that transferring elements from the input stack to the output stack happens using for (let i = 0; i < this.inputStack.size(); i++). However, this will cause an issue because this.inputStack.size() changes dynamically as elements are popped during each iteration.

// Instead, a while loop should be used for transferring elements, as it continues until the inputStack is empty.

//14.
// In JavaScript, the value of 'this' is determined by how a function is called. When you invoke a function in a certain context (like using an object method), this refers to that context (i.e., the object from which the function is called).
// Context (this): The context (this) inside the returned memoized function will refer to the object from which the memoized function is called (for example, a.memoed(2) will ensure that this refers to a). Using func.apply(this, args) ensures that the correct context is passed to func.
//When you use func(X) directly, JavaScript cannot infer what object this should refer to. Here's the basic rule:

// Method Call: When a function is called as a method of an object, e.g., object.method(), this refers to the object.
// Function Call: When a function is called directly, e.g., func(), this refers to the global object (or undefined in strict mode).
// The JavaScript engine does not automatically "look up the chain" to find the correct context of this when calling the function directly.

//Arrow functions in JavaScript do not have their own this. Instead, they lexically bind this based on the surrounding scope when the function is defined. This means that the value of this inside an arrow function is determined by where the function is defined, not by how it is called.
// This can be problematic in your memo function because, when using arrow functions, this will refer to the enclosing context (which might not be what you want, especially when the memoized function is called as a method of an object).
function memo(func, resolver = (...args) => Array.from(args).join('_')) {
  //return a function accept arguments
  //store keys as array
  //if key in dic, then return the value
  //if key does not exits, call func and cached the key and value in dic
  let dic = {};
  //let context = this //a.memo(2,), in this case, a is this and then pass to func
  return function(...args) {
    let key = resolver(...args)
    let value;
    if (key in dic) {
      value = dic[key]
    } else {
      //value = func(...args) this does not apply to object
      value = func.apply(this, args) //call function with context and array of args
      dic[key] = value
    }
    return value;
  };
}


// The value of this inside funcThis is determined by how funcThis is called. In this case, funcThis is called via the memoed method, so this refers to a (the object).
// .apply(this, args) ensures that funcThis is called with the correct context (this referring to a) and arguments (args is [2]).

//25
function sort(items, newOrder) {
  let n = items.length;

  for (let i = 0; i < n; i++) {
    // Process each item only if it's not already placed in the correct position
    while (newOrder[i] !== i) {
      let targetIndex = newOrder[i];

      // Swap items to their correct positions
      [items[i], items[targetIndex]] = [items[targetIndex], items[i]];

      // Swap newOrder values to reflect the changes
      [newOrder[i], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[i]];
    }
  }

  return items;
}

// 2nd way
function sort(items, newOrder) {
  // Create a dictionary to map new indices to corresponding values
  let new_dic = {};

  // Populate the dictionary with the elements from 'items' based on 'newOrder'
  newOrder.forEach((ele, index) => {
    new_dic[ele] = items[index];
  });

  // Reorder the items inline based on the new_dic mapping
  Object.entries(new_dic).forEach(([key, val]) => {
    items[key] = val;
  });

  return items;
}

//3. implement Array.prototype.flat()

//do not use for of because it will escape undefined value
//also the base case is 2: if depth = 0 or not array
function flat(arr, depth = 1) {
  let result = [];
  arr.forEach(item => {
    if(Array.isArray(item) && depth > 0) {
      result.push(...flat(item, depth - 1));
    }
    else result.push(item);
  });
  return result;
}
