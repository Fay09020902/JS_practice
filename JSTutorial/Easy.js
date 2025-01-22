// //1.implement curry()
// function curry(fn) {
//   return function middle(...args) {
//     if (args.length >= fn.length) {
//       return fn(...args)
//     } else {
//       return middle.bind(null, ...args)
//     }
//   }
// }

// //second way
// function curry(fn) {
//   // Return a function to start the currying process
//   return function inner(...args) {
//     // Check if we have enough arguments to call the function
//     if (args.length >= fn.length) {
//       // If enough arguments, call the original function
//       return fn(...args);
//     } else {
//       // Otherwise, return a new function that binds the next arguments
//       // `bind` will return a new function that can be called again with more arguments
//       return inner.bind(null, ...args);
//     }
//   };
// }

// //mo bind
// function curry(fn) {
//   // Return a function to start the currying process
//   return function inner(...args) {
//     // Check if we have enough arguments to call the function
//     if (args.length >= fn.length) {
//       // If enough arguments, call the original function
//       return fn(...args);
//     } else {
//       return function(...args1) {
//         return inner(...args, ...args1)
//       }
//     }
//   };
// }

// //Now you call the previously bound function with (2, 3).
// //Calling a bound function with extra arguments appends those
// // new arguments to the previously bound ones. In other words:
// //Initially: The bound function had [1] as pre-set arguments.
// //Now you invoke it with (2, 3).
// //Internally, this results in calling middle with [1, 2, 3].


// //method 2
// function curry(fn) {
//   return function middle(...args) {
//     if (args.length >= fn.length) {
//       return fn(...args)
//     } else {
//       return (args2) => {
//         return middle(...args, args2)
//       }
//     }
//   }
// }

// // 11. what is Composition? create a pipe()
// function pipe(funcs) {
//     // Return a function that takes `x` as input
//     return function(x) {
//       // Use reduce to apply all functions in the pipeline
//       return funcs.reduce((prev, cur) => {
//         return cur(prev); // Apply the current function to the result of the previous one
//       }, x); // Start with the initial value `x`
//     };
// }

// //method 2
// function pipe(funcs) {
// 	return x => {
// 			let rslt = x
// 			for (let func of funcs) {
// 				rslt = func(rslt)
// 			}
// 			return rslt
// 	}
// }



// // 18. Improve a function
// function excludeItems(items, excludes) {
//     let excludeMap = new Map()
//     //the new map stucture will be like {'color': set('silver', 'gold')} {'type': set('','')}
//     for (let {k, v} of excludes) {
//       //k is 'color, v is 'silver'
//       if(!excludeMap.has(k)){
//          excludeMap.set(k, new Set([v]))
//       }
//       excludeMap.get(k).add(v);
//     }
//     items = items.filter(item => {
//       //[[color, 'red'], [type, 'tv]]
//       //apply to each pair: if the key not in exclude or the item not in exclude, return true
//       //if all pair results are true, returns true, otherwise false.
//       return Object.entries(item).every(([key, val]) => {
//         return !excludeMap.has(key) || !excludeMap.get(key).has(val)
//       })
//     })
//     return items
//   }

//   //8. can you shuffle() an array?
//   function shuffle(arr) {
//     // modify the arr inline to change the order randomly
//   //   Begin at the last index of the array (in this case, index 3 for the element 4).
//   // Generate a random integer r between 0 and the current index (inclusive).
//   // Swap the element at the current index with the element at index r.
//   // Move one position forward (i.e., decrement the index) and repeat the random selection and swap steps until you've passed through the entire array.
//     for (let i = arr.length - 1; i >0; i--) {
//       let randomIndex = Math.floor(Math.random() * (i + 1));
//       [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
//     }
//     return arr
//   }

//   //9
//   //wrong

//   function decode(message) {
//     let rsl
//     let col_len = message[0].length - 1
//     let row_len = message.length - 1
//     let [x, y] = [0, 0]
//     let sign = -1
//     while(x <= col_len) {
//       rsl += message[y][x]
//       if (y === 0) {
//         y += 1
//         sign = 1;
//       } else if(y === row_len){
//         y -= 1
//         sign = -1
//       } else {
//         y = y + sign
//       }
//       x += 1
//     }
//     return rsl
//   }

//   function decode(message) {
//     let rsl = ''; // Initialize the result string as an empty string
//     let col_len = message[0].length - 1; // Last column index
//     let row_len = message.length - 1; // Last row index
//     let [x, y] = [0, 0]; // Starting coordinates
//     let sign = -1; // Used to change direction (up or down)

//     while (x <= col_len) {
//       rsl += message[y][x]; // Add current character to the result string

//       // Check if we need to change direction (either top or bottom row)
//       if (y + sign < 0 || y + sign > row_len) {
//         sign *= -1; // Reverse direction
//       }

//       y += sign; // Move up or down
//       x += 1; // Move right
//     }

//     return rsl;
//   }


//   //10. first bad version
//   function firstBadVersion(isBad) {
//     // firstBadVersion receive a check function isBad
//     // and should return a closure which accepts a version number(integer)
//     return (version) => {
//       // write your code to return the first bad version
//       // if none found, return -1
//       let low = 0;
//       let high = version;

//       while(low < high) {
//         let middle = Math.floor((low + high) / 2);
//         if(isBad(middle)) {
//           high = middle
//         } else {
//           low = middle + 1
//         }
//       }
//       return isBad(high) ? high : -1; // Check if a bad version exists
//     }
//   }


// //13. Implement a Queue by using Stack
// //wrong answer due to the peek not using while
// class Queue {
//   constructor() {
//     this.inputStack = new Stack()
//     this.outputStack = new Stack()
//   }
//   enqueue(element) {
//     this.inputStack.push(element)
//   }
//   peek() {
//     if(!this.outputStack.size()) {
//       for(let i = 0; i < this.inputStack.size(); i++) {
//         let last_ele = this.inputStack.pop()
//         this.outputStack.push(last_ele)
//         }
//     }
//     return this.outputStack.peek()
//   }
//   size() {
//     // return count of element
//     return this.inputStack.size() + this.outputStack.size();
//   }
//   dequeue() {
//     if (this.outputStack.size() === 0) {
//       // Transfer elements from inputStack to outputStack
//       while (this.inputStack.size() > 0) {
//         this.outputStack.push(this.inputStack.pop());
//       }
//     }
//     return this.outputStack.pop();
//   }
// }





// // Your implementation of the peek method contains a subtle bug: the loop condition in peek assumes that transferring elements from the input stack to the output stack happens using for (let i = 0; i < this.inputStack.size(); i++). However, this will cause an issue because this.inputStack.size() changes dynamically as elements are popped during each iteration.

// // Instead, a while loop should be used for transferring elements, as it continues until the inputStack is empty.

// //14.
// // In JavaScript, the value of 'this' is determined by how a function is called. When you invoke a function in a certain context (like using an object method), this refers to that context (i.e., the object from which the function is called).
// // Context (this): The context (this) inside the returned memoized function will refer to the object from which the memoized function is called (for example, a.memoed(2) will ensure that this refers to a). Using func.apply(this, args) ensures that the correct context is passed to func.
// //When you use func(X) directly, JavaScript cannot infer what object this should refer to. Here's the basic rule:

// // Method Call: When a function is called as a method of an object, e.g., object.method(), this refers to the object.
// // Function Call: When a function is called directly, e.g., func(), this refers to the global object (or undefined in strict mode).
// // The JavaScript engine does not automatically "look up the chain" to find the correct context of this when calling the function directly.

// //Arrow functions in JavaScript do not have their own this. Instead, they lexically bind this based on the surrounding scope when the function is defined. This means that the value of this inside an arrow function is determined by where the function is defined, not by how it is called.
// // This can be problematic in your memo function because, when using arrow functions, this will refer to the enclosing context (which might not be what you want, especially when the memoized function is called as a method of an object).
// function memo(func, resolver = (...args) => Array.from(args).join('_')) {
//   //return a function accept arguments
//   //store keys as array
//   //if key in dic, then return the value
//   //if key does not exits, call func and cached the key and value in dic
//   let dic = {};
//   //let context = this //a.memo(2,), in this case, a is this and then pass to func
//   return function(...args) {
//     let key = resolver(...args)
//     let value;
//     if (key in dic) {
//       value = dic[key]
//     } else {
//       //value = func(...args) this does not apply to object
//       value = func.apply(this, args) //call function with context and array of args
//       dic[key] = value
//     }
//     return value;
//   };
// }


// // The value of this inside funcThis is determined by how funcThis is called. In this case, funcThis is called via the memoed method, so this refers to a (the object).
// // .apply(this, args) ensures that funcThis is called with the correct context (this referring to a) and arguments (args is [2]).

// //25
// function sort(items, newOrder) {
//   let n = items.length;

//   for (let i = 0; i < n; i++) {
//     // Process each item only if it's not already placed in the correct position
//     while (newOrder[i] !== i) {
//       let targetIndex = newOrder[i];

//       // Swap items to their correct positions
//       [items[i], items[targetIndex]] = [items[targetIndex], items[i]];

//       // Swap newOrder values to reflect the changes
//       [newOrder[i], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[i]];
//     }
//   }

//   return items;
// }

// // 2nd way
// function sort(items, newOrder) {
//   // Create a dictionary to map new indices to corresponding values
//   let new_dic = {};

//   // Populate the dictionary with the elements from 'items' based on 'newOrder'
//   newOrder.forEach((ele, index) => {
//     new_dic[ele] = items[index];
//   });

//   // Reorder the items inline based on the new_dic mapping
//   Object.entries(new_dic).forEach(([key, val]) => {
//     items[key] = val;
//   });

//   return items;
// }

// //3. implement Array.prototype.flat()

// //do not use for of because it will escape undefined value
// //also the base case is 2: if depth = 0 or not array
// function flat(arr, depth = 1) {
//   let result = [];
//   arr.forEach(item => {
//     if(Array.isArray(item) && depth > 0) {
//       result.push(...flat(item, depth - 1));
//     }
//     else result.push(item);
//   });
//   return result;
// }

// //Spy decorator
// function work(a, b) {
//   return  a + b; // work is an arbitrary function or method
// }

// function spy(func) {
//  function wrapper(...args) {
//      wrapper.calls.push(args)
//      let result = func(...args)
//      return result
//   }
//   wrapper.calls = []
//   return wrapper
// }
// work = spy(work);

// console.log(work(1, 2)); // 3
// console.log(work(4, 5)); // 9
// console.log(work(1, 5)); // 9

// for (let args of work.calls) {
//   console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
// }

//with this method

// let obj = {
//   multiplier: 2,
//   multiply(a) {
//     return this.multiplier * a; // Relies on `this`
//   }
// };

// function spy(func) {
//   function wrapper(...args) {
//       wrapper.calls.push(args)
//       let result = func.apply(this, args)
//       return result
//    }
//    wrapper.calls = []
//    return wrapper
//  }
// // Apply the spy decorator
// obj.multiply = spy(obj.multiply);

// console.log(obj.multiply(5)); // Version 1: NaN; Version 2: 10




// //Delaying decoratorc: Create a decorator delay(f, ms) that delays each call of f by ms milliseconds.
// function f(x) {
//   console.log(x);
// }

// function delay(func, t) {
//   return function() {
//     setTimeout(()=> func.apply(this, arguments), t)
//   }
// }
// // create wrappers
// let f1000 = delay(f, 1000);
// let f1500 = delay(f, 1500);

// f1000("test"); // shows "test" after 1000ms
// f1500("test"); // shows "test" after 1500ms



// //Debounce decorator
// function debounce(func, t) {
//   let id
//   return function(...args) {
//     clearTimeout(id)
//     id = setTimeout(() => func(...args), t)
//   }
// }
// let f = debounce((n) => console.log(n), 1000);

// f("a");
// setTimeout( () => f("b"), 200);
// setTimeout( () => f("c"), 500);

// //1299

// var replaceElements = function(arr) {
//   let left = 0
//   if(arr.length === 1) {
//       return [-1]
//   }
//   for (let i = 0; i < arr.length - 1; i++) {
//       let max = arr[i+1]

//       for(let right = i + 1; right < arr.length; right++) {
//          if(arr[right] > max) {
//           max = arr[right]
//          }
//       }
//       arr[i] = max
//   }
//   arr[arr.length - 1] = -1
//   return arr
// };


// //easy slution
// var replaceElements = function(arr) {
//   let maxSoFar = -1; // Start with -1 as the last element will always be -1
//   for (let i = arr.length - 1; i >= 0; i--) {
//       let current = arr[i];
//       arr[i] = maxSoFar;
//       if (current > maxSoFar) {
//           maxSoFar = current; // Update the max so far
//       }
//   }
//   return arr;
// };


// //392
// var isSubsequence = function(s, t) {
//   //two pointers, left pinter is the current position, right index find the corresponding current
//   //char's position

//   let s_index = 0
//   let t_index = 0

//   while (s_index < s.length && t_index < t.length) {
//       let cur_char = s[s_index]
//       //if t value equal to current value, shift s_index and t_index
//       //if not, shift t_index
//       if(t[t_index] === cur_char) {
//          s_index++
//       }
//       t_index++
//   }
//   if (s_index !== s.length) {
//       return false
//   }
//   return true
// };

// //238
// var productExceptSelf = function(nums) {
//     //prefix: take the produt of all elements up to but excluding the current index
//     let prefix = new Array(nums.length).fill(1)
//     for(let i = 1; i < nums.length; i++) {
//         prefix[i] = nums[i-1] * prefix[i-1]
//     }
//     let suffix = new Array(nums.length).fill(1)

//     // wrong//suffix[j] = nums[j+1] * suffix[j+1], when j is the last index, nums[j+1] will result in an out-of-bounds error.
//     // for(let j = nums.length - 1; j >=0; j++) {
//     //     suffix[j] = nums[j+1] * suffix[j+1]
//     // }

//     for(let j = nums.length - 2; j >=0; j--) {
//         suffix[j] = nums[j+1] * suffix[j+1]
//     }
//     let result = new Array(nums.length);
//     for (let k = 0; k < nums.length; k++) {
//         result[k] = prefix[k] * suffix[k];
//     }

//     return result;
// };


// //271， encode decode
// /**
//  * Encodes a list of strings to a single string.
//  *
//  * @param {string[]} strs
//  * @return {string}
//  */
// var encode = function(strs) {
//     let encode_message = ''
//     return strs.join("π")
// };

// /**
//  * Decodes a single string to a list of strings.
//  *
//  * @param {string} s
//  * @return {string[]}
//  */
// var decode = function(s) {
//     return s.split("π")
// };

// //1496. Path Crossing
// var isPathCrossing = function(path) {
//     //start at 00
//     //if north, then column+1, s column - 1
//     //if e row +1, west row - 1
//     //create a dic where rol is the key, cols are sets
//     //if row, colm in dic, then wrong
//     let exsits_cor = {0: new Set([0])}
//     let row = 0
//     let column = 0
//     for(let dir of path) {
//        if(dir == 'N') {
//            column += 1
//        }
//        if(dir == 'S') {
//            column -= 1
//        }
//        if(dir == 'E') {
//            row += 1
//        }
//        if(dir == 'W') {
//            row -= 1
//        }
//        if(!exsits_cor[row]) {
//            exsits_cor[row] = new Set([column])
//        } else if (exsits_cor[row].has(column)){
//            return true
//        } else {
//            exsits_cor[row].add(column)
//        }
//     }
//    return false
// };
