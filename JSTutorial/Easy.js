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

// //58. Length of Last Word
// var lengthOfLastWord = function(s) {
//     //lenght index intervall + 1
//     let start = s.length - 1
//     let end
//     while(s[start] == ' ') {
//         start--
//     }
//     //end cannot be -1
//     end = start
//     while(end >= 0 && s[end] !== ' ') {
//         end--
//     }
//     // console.log(s[start])
//     // console.log(s[end])
//     return start - end
// };


// var lengthOfLastWord = function(s) {
//     //lenght index intervall + 1
//     let start = s.length - 1
//     let l = 0
//     while(s[start] == ' ') {
//         start--
//     }
//     while(start >= 0 && s[start] !== ' ') {
//         l += 1
//         start--
//     }
//     // console.log(s[start])
//     // console.log(s[end])
//     return l
// };

// //14. Longest Common Prefix
// var longestCommonPrefix = function(strs) {
//     //the letter must in all words
//     let l = ""
//     for(let i = 0; i <= strs[0].length - 1; i++) {
//        let letter = strs[0][i]
//        for(let j = 1; j < strs.length; j++) {
//         if(strs[j][i] !== letter) {
//             return l
//         }
//        }
//        l += letter
//     }
//     return l
// };

// //118. Pascal's Triangle
// var generate = function(numRows) {
//     if(numRows == 1) {
//         return [[1]]
//     }
//     if(numRows == 2) {
//         return [[1], [1, 1]]
//     }
//     //start with 1, then loop the last row and add neibours to get the sum, at the end, push 1
//     let rsl = [[1], [1, 1]]
//     let countRows = 2
//     while(countRows < numRows) {
//         let last_row = rsl[rsl.length - 1]
//         let next_row = [1]
//         for(let i = 0; i < last_row.length - 1; i++) {
//            let cur = last_row[i] + last_row[i+1]
//            next_row.push(cur)
//         }
//         next_row.push(1)
//         rsl.push(next_row)
//         countRows++
//     }
//     return rsl
// };


// //27
// var removeElement = function(nums, val) {
//     let i = 0; // Pointer for non-val elements
//     let j = nums.length - 1; // Pointer for potential swaps

//     while (i <= j) {
//         if (nums[i] === val) {
//             // If nums[i] is val, swap it with nums[j] and decrement j
//             [nums[i], nums[j]] = [nums[j], nums[i]];
//             j--;
//         } else {
//             // If nums[i] is not val, move to the next element
//             i++;
//         }
//     }

//     // i now points to the length of the non-val portion
//     return i;
// };


// //205. Isomorphic Strings
// var isIsomorphic = function(s, t) {
//     let maps = {};
//     let mapt = {};

//     if (s.length !== t.length) {
//         return false;
//     }

//     for (let i = 0; i < s.length; i++) {
//         let charS = s[i];
//         let charT = t[i];

//         // Check s -> t mapping
//         if (maps[charS] && maps[charS] !== charT) {
//             return false;
//         }

//         // Check t -> s mapping
//         if (mapt[charT] && mapt[charT] !== charS) {
//             return false;
//         }

//         // Create mappings
//         maps[charS] = charT;
//         mapt[charT] = charS;
//     }

//     return true;
// };

// //605. Can Place Flowers
// var canPlaceFlowers = function(flowerbed, n) {
//     let count = 0;

//     for (let i = 0; i < flowerbed.length; i++) {
//         // Check if the current spot is 0 and adjacent spots are also 0
//         if (flowerbed[i] === 0 &&
//             (i === 0 || flowerbed[i - 1] === 0) && // No left neighbor or left neighbor is 0
//             (i === flowerbed.length - 1 || flowerbed[i + 1] === 0)) { // No right neighbor or right neighbor is 0
//             flowerbed[i] = 1; // Plant a flower
//             count++; // Increment the flower count
//             i++; // Skip the next spot (can't plant adjacent flowers)
//         }
//     }

//     return count >= n; // Return true if we have enough flowers planted


// //15. 3Sum
// var threeSum = function(nums) {
//     //need sorting to avoid duplicates
//     let rsl = []
//     nums.sort((a, b) => a - b) //time complexity O(nlogn)
//     //loop pivot elements and use two pointers to analyze elements to its right
//     //a. if value of current pointer is same as last(left neighbor) pivot, pivot++
//     //b. if value of left+right smaller than target, then move left, otherwise move right
//     let pivot = 0;
//     while(pivot < nums.length - 2) {
//         // Skip duplicate pivot values
//         while(nums[pivot] == nums[pivot - 1] && pivot > 0) { //not the first element in nums
//             pivot++
//             continue;
//         }
//         let left = pivot + 1
//         let right = nums.length - 1
//         while(left < right) {
//             let sum = nums[left] + nums[right]
//             if(sum < (-nums[pivot])) {
//                 left++
//             } else if (sum === (-nums[pivot])) {
//                 rsl.push([nums[pivot], nums[left], nums[right]])
//                 //[2,2,0,0,-2,-2]
//                 while (left < right && nums[left] === nums[left + 1]) left++;
//                 while (left < right && nums[right] === nums[right - 1]) right--;
//                 left++;
//                 right--;
//             } else {
//                 right --
//             }
//         }
//         pivot++
//     }
//     return rsl
// };


// //496

// var nextGreaterElement = function(nums1, nums2) {
//     //make a dic for the next greater value
//     //index bigger than current and val bigger than cur
//     let dic = {} //mao val to next greater element
//     for(let i = 0; i < nums2.length; i++) {
//         let cur = nums2[i]
//         let j = i + 1

//         while(j < nums2.length && cur >= nums2[j]) {
//             j++
//         }
//         if(j === nums2.length) {
//             dic[cur] = -1
//         } else {
//             dic[cur] = nums2[j]
//         }
//     }
//     let rsl = []
//     for(let ele of nums1) {
//         rsl.push(dic[ele])
//     }
//     return rsl
// };


// //better solution
// var nextGreaterElement = function(nums1, nums2) {
//     //stack
//     //make dictionnary fot num1 to mark their position in result arr {4: 0, 1:1, 2:2}
//     //loop through nums2 to initailize stack, if the element in the nums1, push to stack
//     //1. continue loop through nums2,
//     //a. while stack, if the current bigger than the last of stack, write result and pop it
//     //b.if it is bigger than current [4] [3]
//     //number is in nums1, push current number into stack
//     let map = {}
//     let stack = []
//     let result = new Array(nums1.length).fill(-1);
//     for(let i = 0; i < nums1.length; i++) {
//         map[nums1[i]] = i
//     }
//     for(let num of nums2) {
//         while(stack && (stack[stack.length - 1] < num)) {
//             if(stack[stack.length - 1] in map) {
//                 result[map[stack[stack.length - 1]]] = num
//             }
//             stack.pop()
//         }
//         stack.push(num)
//     }
//     return result
// };


// //724
// var pivotIndex = function(nums) {
//     //left_sum + pivot + rightsum = sum(nums)

//     let totalSum = nums.reduce((acc, num) => acc + num, 0);
//     let left_sum = 0
//     for (let i = 0; i < nums.length; i++) {
//         let right_sum = totalSum - left_sum - nums[i];
//         if (left_sum === right_sum) {
//             return i; // Found the pivot index
//         }
//         left_sum += nums[i];
//     }
//     return -1; // No pivot index found
// };


// //896. Monotonic Array
// var isMonotonic = function(nums) {
//     if(nums.length === 1) {
//         return true
//     }
//     let flag = nums[1] - nums[0] //0 if equal, positive if increasing, negative if decreasing
//     for (let i = 1; i < nums.length; i++) {
//         if (nums[i] > nums[i - 1]) { // Increasing trend
//             if (flag < 0) {
//                 return false; // Conflicting trend (was decreasing)
//             }
//             flag = 1;
//         } else if (nums[i] < nums[i - 1]) { // Decreasing trend
//             if (flag > 0) {
//                 return false; // Conflicting trend (was increasing)
//             }
//             flag = -1;
//         }
//     }
//     return true
// };

// //121. Best Time to Buy and Sell Stock
// var maxProfit = function(prices) {
//     //have a min price and max profit,
//     //loop arr
//     //a. if bigger than min price, caculate and compare to max profit
//     //b if smaller than min price, update min price
//     //c.if equal min price, do nothing
//     let minPrice = Infinity
//     let maxProfit = 0
//     for(let p of prices) {
//         if(p < minPrice) {
//             minPrice = p
//         } else if(p - minPrice > maxProfit) {
//             maxProfit = p - minPrice
//         }
//     }
//     return maxProfit
// };


// var maxProfit = function(prices) {
//     //two pointers
//     //move left pointers over to its end every time we encounter a lower buyPrice than our current buyPrice and update maxProfit seen so far
//     if(prices.length === 1) {
//         return 0
//     }
//     let left = 0 //buy
//     let right = 1 //sell
//     let maxProfit = 0
//     while(right < prices.length) {
//         maxProfit = Math.max(maxProfit, prices[right] - prices[left])
//         if(prices[right] < prices[left]) {
//             left = right
//         }
//         right++
//     }
//     return maxProfit
// };

// //2824
// var countPairs = function(nums, target) {
//     //-1 1 1 2 3 target 2
//     //two pointers, -1 + 3 = 2 which == target, we move right
//     //-1 + 2 = 1 which < target, then [left, left+1, .... right] all valid
//     //and move left one forward
//     let left = 0
//     let right = nums.length
//     nums.sort((a, b) => a - b)
//     let count = 0
//     while (left < right) {
//         if(nums[left] + nums[right] < target) {
//             count += right - left
//             left++
//         } else {
//             right--
//         }
//     }
//     return count
// };


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */


// //16
// var threeSumClosest = function(nums, target) {
//     //-4 -1 1 2 , target 1
//     //minSum = abs(sum - target) Infnity
//     //-4, -1 + 2; -4 + 1 = -3;  -3 < 1, distance: 1--3 = 4 < minSum, update, move left
//     //-4, 1 + 2; -4 + 3 = -1; -1 < 1, distance 2 < minSum, update and move left
//     //next pivot -1, -1 + 1 + 2 > target,  move right
//     //if abs(-4 + twoSum - target) > minSum,
//     //loop through numbers and for each pivot
//     //use two pointers for the nums to pivot's right
//     //if equal to pivot, return target
//     //if small than pivot, update minSum and move left
//     let minSum = Infinity
//     nums.sort((a, b) => a - b);
//     for(let pivot = 0; pivot < nums.length; pivot++) {
//         let pivotNum = nums[pivot]
//         let left = pivot + 1
//         let right = nums.length - 1
//         while(left < right) {
//             let sum = pivotNum + nums[left] + nums[right]
//             if (Math.abs(sum - target) < Math.abs(minSum - target)) {
//                minSum = sum;
//             }
//             if(sum === target) {
//                 return sum
//             } else if(sum < target) {
//                 left++
//             } else {
//                 right--
//             }
//         }
//     }
//     return minSum
// };


//209

// /**
//  * @param {number} target
//  * @param {number[]} nums
//  * @return {number}
//  */
// var minSubArrayLen = function(target, nums) {
//     //use right as pivot, for loop though right = 0 to end
//     //in each loop, find all possible subarray where sum >= target
//     //add the right to the window
//     //a.if sum < target: go to next loop
//     //b.if sum >= target, we find min length with this left and right, log the minal length
//     //and we need to find subaray with this right end by going through all possible left pivot
//     //b.1 use while sum >= target loop by increasing left or left == right
//     //b.1.1 if sum < target: log the minimal length adn continue the loop
//     //2 < target,
//     //add next to window 2 + 3 < target
//     //add next to window 2+3+1 < target
//     //add next to window 2+3+1+2 > target  log the minimal length
//     //delete first num if 3+1+2 < target and add next number
//     //3+1+2+4 log the minimal length
//     //delete first num 1+2+4 if >= target, log the minimal length
//     //delete first num 2+4 < target, we add next to window
//     //a.make a window, while left < right and right < length
//     //a1.if sum window smaller than target, add next to window
//     //a2.if sum window larger or equal to target, log the length and delete first num

//     let left = 0
//     let sum = 0
//     let minLen = nums.length + 1
//     for(let right = 0; right < nums.length; right++) {
//         sum += nums[right]
//         if(sum < target) {
//             continue
//         }
//         // ✅ Shrink the window from the left while sum >= target
//         while (sum >= target && left <= right) {
//             minLen = Math.min(right - left + 1, minLen)
//             sum -= nums[left]
//             left++
//         }
//     }
//     return minLen === nums.length + 1 ? 0 : minLen;
// };

//secondway
//     let left = 0
//     let sum = 0
//     let minLen = nums.length + 1
//     for(let right = 0; right < nums.length; right++) {
//         sum += nums[right]
//         if(sum < target) {
//             continue
//         }
//         // if sum - nums[left] >= target, we can remove from left
//         while (sum - nums[left] >= target && left <= right) {
//             sum -= nums[left]
//             left++
//         }
//         minLen = Math.min(right - left + 1, minLen)
//     }
//     return minLen === nums.length + 1 ? 0 : minLen;
// };


// //713
// var numSubarrayProductLessThanK = function(nums, k) {
//     //loop through right pivot point
//     //move left until product less than k
//     //if product less than k, the subset of k also less than k
//     let left = 0
//     let count = 0
//     let product = 1
//     for(let right = 0; right < nums.length; right++) {
//         product = product * nums[right]
//         while(product >= k && left < right) {
//             product = product / nums[left]
//             left ++
//         }
//         if(product < k) {
//             count = count + right - left + 1
//         }
//     }
//     return count
// };


// // //735
// // Optimized Approach:
// // Create a stack
// // Iterate over asteroids
// // while we have a collision between top of stack and curr asteroid
// // pop the stack if the curr asteroid is bigger
// // set the curr asteroid to null so we don't add it to the stack if the asteroid on top of stack is bigger
// // or pop the stack and set the curr asteroid to null if they're the same size
// // if no collisions then push on the curr asteroid
// // Return stack at the end



// // Input: [1,2,3,4,5,6,7,8,9,-10]

// // Output: [-10]

// // Input:
// // asteroids = [1,2,3,-3,4,-2,-1]

// // stack = [1,2,4]

// // Time = 2 passes of length n, n + n = 2n => O(n)
// // Space = O(n)

// // n^2 is for n operations I do n operations


// const asteroidCollision = asteroids => {
// 	let stack = [];
// 	for (asteroid of asteroids) { //n
// 	while(stack.length != 0 && asteroid < 0 && stack.at(-1)>0){
// 	let diff = asteroid + stack.at(-1); //3

// 	if (diff < 0) {
// 	stack.pop()
// } else if (diff > 0) {
// 	asteroid = 0;
// } else {
// 	asteroid = 0;
// 	stack.pop();
// }
// }
// if (asteroid) {
// 	stack.push(asteroid)
// }
// }
// return stack
// }


// //503

// var nextGreaterElements = function(nums) {
//     //for i in range(n * 2 - 1, -1, -1):
//     // x = nums[i % n]
//     //if empty push to stack
//     //if cur one is greater than top, pop top one and log it's next greater value, repeat this until
//     //smaller
//     //if smaller than top, push to stack
//     //[1, 2, 1, 1, 2, 1]
//     const n = nums.length;
//     const ans = Array(n).fill(-1);
//     const st = [];
//     for(let i = 0; i < nums.length*2 - 1; i++) {
//         let cur_index = i % nums.length
//         // console.log(i, cur_index)
//         while(st.length > 0 && nums[cur_index] > st[st.length - 1][0]) {
//            let prev = st.pop()
//            ans[prev[1]] = nums[cur_index]
//         }
//         st.push([nums[cur_index], cur_index])
// // console.log(st)
// //         console.log(ans)
// //         console.log(".......")
//     }
//     return ans
// };


// //34

// var lowerbound = function(nums, target) {
//     let left = 0
//     let right = nums.length
//     while(left < right) { //at least one element in it
//         let mid = Math.floor((left + right) / 2)
//         if(nums[mid] < target) {
//             left = mid + 1
//         } else {
//             right = mid//询问的区间缩小至[left, mid - 1] == [left, mid)
//         }
//     }
//     return left
// }

// var searchRange = function(nums, target) {
//     let ans = [-1, -1]
//     let left = 0
//     let right = nums.length - 1
//     //区间内的数（下标）都是还未确定与 target 的大小关系的，有的是 < target，有的是 ≥ target
//     // 检查是否找到 target
//     let first = lowerbound(nums, target)
//     if (first >= nums.length || nums[first] !== target) {
//         return [-1, -1]
//     }

//     let last = lowerbound(nums, target + 1) - 1
//     return [first, last]
// };


// //2958
// var maxSubarrayLength = function(nums, k) {
//     //for every righht pivot, find all possible subarrays
//     //if frequency not within the k, we short the left until under frequency
//     //log the length
//     let ans = 1
//     let frequency_map = {}
//     let left = 0
//     for(let right = 0; right < nums.length; right++) {
//         let cur = nums[right]
//         if(frequency_map[cur]) {
//             frequency_map[cur]++
//         } else {
//             frequency_map[cur] = 1
//         }
//         while((frequency_map[cur]) > k) {
//            frequency_map[nums[left]]--
//            left++
//         }
//         //console.log(frequency_map, left, right)
//         ans = Math.max(right - left + 1, ans)
//     }
//     return ans
// };

// //2529
// var maximumCount = function(nums) {
//     //the left of left index <0 and right of right index >=0
//     //if middle < 0, move left to middle + 1
//     //if middle >= 0, move right to middle - 1
//     //once right < middle, means no value left to compare
//     //num of negative is right, num of positive = length - right - number of 0s
//     let left = 0
//     let right = nums.length - 1
//     let zero_count = 0
//     // Find the first non-negative number (0 or positive)
//     while(left <= right) {
//         let mid = Math.floor((left + right) / 2)
//         if(nums[mid] >= 0) {
//             right = mid - 1
//         } else {
//             left = mid + 1
//         }
//     }
//     let negCount = left;
//     // Find the first positive number (ignoring zeros)
//     //left <= 0
//     left = 0, right = nums.length - 1;
//     while(left <= right) {
//         let mid = Math.floor((left + right) / 2)
//         if(nums[mid] <= 0) {
//             left = mid + 1
//         } else {
//             right = mid - 1
//         }
//     }
//     let posCount = nums.length - left; // Count of positive numbers (ignoring zeros)

//     return Math.max(negCount, posCount);
// };


// //129
// var sumNumbers = function(root) {
//     let sum = 0
//     function f(root, number) {
//         if(root === null) {
//             return 0
//         }
//         number = number*10 + root.val
//         if(root.left === null && root.right === null) {
//             sum += number
//         }
//         f(root.left, number)
//         f(root.right, number)
//     }
//     f(root, 0)
//     return sum
// };


// //1448
// var goodNodes = function(root, maxSoFar = -Infinity) {
//     if (root === null) {
//         return 0;
//     }

//     let count = 0;
//     if (root.val >= maxSoFar) {
//         count = 1; // This node is "good"
//         maxSoFar = root.val; // Update max for this path
//     }

//     return count + goodNodes(root.left, maxSoFar) + goodNodes(root.right, maxSoFar);
// };


// //101
// var isSymmetric = function(root) {
//     if (root === null) return true;

//     function dfs(left, right) {
//         if (left === null && right === null) return true;
//         if (left === null || right === null) return false;
//         return (left.val === right.val) &&
//                dfs(left.left, right.right) &&
//                dfs(left.right, right.left);
//     }

//     return dfs(root.left, root.right);
// };


// //111
// var minDepth = function(root) {
//     if (root === null) return 0;
//     if(root.left === null) {
//         return minDepth(root.right) + 1
//     }
//     if(root.right === null) {
//         return minDepth(root.left) + 1
//     }
//     return Math.min(minDepth(root.left), minDepth(root.right)) + 1
// };



// var minDepth = function(root) {
//     if (root === null) return 0;
//     let min = -Infinity
//     function helper(root, depth) {
//         if(root === null) {
//             return
//         }
//         depth += 1
//         if(root.left === null && root.right === null){
//            min = Math.min(min,depth)
//         }
//         helper(root.left, depth)
//         helper(root.right, depth)
//     }
//     helper(root, 0)
//     return min
// };


// //112
// var hasPathSum = function(root, targetSum) {

//     function helper(root, sum) {
//         if(root === null) {
//             return false
//         }
//         sum += root.val
//         if(root.left === null && root.right === null) {
//             return targetSum === sum
//         }
//         return (helper(root.left, sum) || helper(root.right, sum))
//     }
//     return helper(root, 0)

// };


// //129
// var sumNumbers = function(root) {
//     let sum = 0
//     function helper(root, curSum) {
//         if(root === null) {
//             return 0
//         }
//         curSum = 10*(curSum) + root.val
//         if(root.left === null && root.right === null) {
//             sum += curSum
//             return
//         }
//        helper(root.left, curSum)
//        helper(root.right, curSum)

//     }
//     helper(root, 0)
//     return sum
// };


// //1448

// var goodNodes = function (root, mx = -Infinity) {
//     if (root === null)
//         return 0;
//     const left = goodNodes(root.left, Math.max(mx, root.val));
//     const right = goodNodes(root.right, Math.max(mx, root.val));
//     return left + right + (mx <= root.val);
// };
