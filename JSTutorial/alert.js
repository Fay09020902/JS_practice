// // let name = prompt("Who's there?");
// // if (name == "Admin") {
// //     let password  = prompt("Your password", '')
// //     if (password == "TheMaster") {
// //         alert("Welcome")
// //     } else if (password == "" || password == null) {
// //         alert("Canceled")
// //     } else {
// //         alert("Wrong password")
// //     }
// // } else if (name == "" || name == null) {
// //     alert("Canceled")
// // } else {
// //     alert("I don't konw you")
// // }

// // let salaries = {
// //     John: 100,
// //     Ann: 160,
// //     Pete: 130
// //   }
// // let sum = 0
// // for (let key in salaries) {
// //     sum += salaries[key]
// // }

// // alert(sum)

// function Calculator() {
//     this.read = function() {
//         this.a = prompt("the first number:" , 0)
//         this.b = prompt("the second number: ", 0)
//         }
//     this.sum = function() {
//         return(this.a + this.b)
//     }
//     }

// function Accumulator(startingValue) {
//     this.value = startingValue;
//     this.read = function() {
//         var addval = prompt("new num: ", 0)
//         this.value += addval
//     }
// }


// function readNumber() {
//     let num
//     while (!isFinite(num)){
//         num = prompt("input: ", )
//     }
//     if (num == '') {
//         return null
//     }
//     return num
// }

// function curry(fn) {
//     return function middle(...args) {
//         //if enough args, call fn
//         if (args.length >= fn.length) {
//             return fn(...args)
//         } else {
//             //if not enough args, keep the result and return the fn until enough args
//             // return middle.bind(this, ...args)
//             return (...args1) => middle(...args,...args1)
//         }
//     }
//   }

//  const join = (a, b, c) => {
//     return `${a}_${b}_${c}`
//  }

//  let arr = [5, 3, 8, 1];
//  function filterRangeInPlace(arr, startnum, endnum) {
//     arr.forEach((element, index) => {
//         if (element > endnum || element < startnum) {
//             arr.splice(index, 1)
//         }
//     });
//     return arr
//  }

// let arr = ["HTML", "JavaScript", "CSS"];

// function copySorted(arr) {
//     copy = arr.slice().sort()
//     return copy
// }
// let sorted = copySorted(arr);

// alert( sorted ); // CSS, HTML, JavaScript
// alert( arr ); // HTML, JavaScript, CSS (no changes)

// function Calculator(){
//     this.method = {
//         "-": (a, b) => a - b,
//         "+": (a, b) => a + b
//     }
//     this.calculate = (str) => {
//         let split = str.split(' ')
//         let operator = split[1]
//         return this.method[operator](parseInt(split[0]), parseInt(split[2]))

//     }
//     this.addMethod = (name, func) => {
//         this.method[name] = func
//     }

// }
// let calc = new Calculator;


// let powerCalc = new Calculator;
// powerCalc.addMethod("*", (a, b) => a * b);
// powerCalc.addMethod("/", (a, b) => a / b);
// powerCalc.addMethod("**", (a, b) => a ** b);

// let result = powerCalc.calculate("2 ** 3");
// alert( result ); // 8
// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };

// let users = [ john, pete, mary ];

// let names = users.map(ele =>ele.name)

// alert( names ); // John, Pete, Mary

// let john = { name: "John", surname: "Smith", id: 1 };
// let pete = { name: "Pete", surname: "Hunt", id: 2 };
// let mary = { name: "Mary", surname: "Key", id: 3 };

// let users = [ john, pete, mary ];

// let usersMapped = users.map(ele => ({ fullName: ele.name + " " + ele.surname, id: ele.id }));

// /*
// usersMapped = [
//   { fullName: "John Smith", id: 1 },
//   { fullName: "Pete Hunt", id: 2 },
//   { fullName: "Mary Key", id: 3 }
// ]
// */

// alert( usersMapped[0].id ) // 1
// alert( usersMapped[0].fullName ) // John Smith

// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };

// let arr = [ pete, john, mary ];

// function sortByAge(arr){
//     return arr.sort((a,b) => a.age - b.age)
// }
// sortByAge(arr);

// // now: [john, mary, pete]
// alert(arr[0].name); // John
// alert(arr[1].name); // Mary
// alert(arr[2].name); // Pete


// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 29 };

// let arr = [ john, pete, mary ];

// function getAverageAge(arr) {
//     return arr.reduce((prev, current) => {return prev + current.age},0) /arr.length
// }
// alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
// let users = [
//     {id: 'john', name: "John Smith", age: 20},
//     {id: 'ann', name: "Ann Smith", age: 24},
//     {id: 'pete', name: "Pete Peterson", age: 31},
//   ];
//   function groupById(users) {
//     return users.reduce((prev, cur) => {
//         prev[cur.id] = cur
//         return prev
//     } , {})
//   }
//   let usersById = groupById(users);

// function unique(arr) {
//     return Array.from(new Set(arr))
//   }

//   let values = ["Hare", "Krishna", "Hare", "Krishna",
//     "Krishna", "Krishna", "Hare", "Hare", ":-O"
//   ];

//   alert( unique(values) ); // Hare, Krishna, :-O


// let salaries = {
//     "John": 100,
//     "Pete": 300,
//     "Mary": 250
//   };

//   function sumSalaries(s) {
//     let sum = 0
//     for (let i of Object.values(s)) {
//         sum += i
//     }
//     return sum
//   }

//   alert( sumSalaries(salaries) ); // 650

// let user = {
//     name: "John",
//     years: 30
//   };

// let {name, years, isAdmin=false} = user
// alert(isAdmin)

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
  };

// function topSalary(s) {
//     if (Object.entries(s).length == 0) {
//         return null
//     } else {
//         return Object.entries(s).sort((a, b) => b[1] - a[1])[0]
//     }
// }

// function topSalary(salaries) {

//     let maxSalary = 0;
//     let maxName = null;

//     for(const [name, salary] of Object.entries(salaries)) {
//       if (maxSalary < salary) {
//         maxSalary = salary;
//         maxName = name;
//       }
//     }

//     return maxName;
//   }


// let list = {
//   value: 1,
//   next: {
//     value: 2,
//     next: {
//       value: 3,
//       next: {
//         value: 4,
//         next: null
//       }
//     }
//   }
// };

// function printList(list) {
//   if(list.next == null) {
//     alert(list.value)
//   } else {
//     alert(list.value)
//     printList(list.next)
//   }
// }
// printList(list)

// function sum(num1) {
//   return function (num2) {
//      return num1+num2
//   }
// }
// alert(sum(1)(2))


// function inBetween(a, b) {
//   return function(x) {
//     return x >= a && x <= b;
//   }
// }

// let arr = [1, 2, 3, 4, 5, 6, 7];

// alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

// // alert( arr.filter(inArray([1, 2, 10])) ); // 1,2


// function byField(f) {
//   return (a, b) => {
//     return a[f] - b[f]
//   }
// }

// let users = [
//   { name: "John", age: 20, surname: "Johnson" },
//   { name: "Pete", age: 18, surname: "Peterson" },
//   { name: "Ann", age: 19, surname: "Hathaway" }
// ];

// alert(users.sort(byField('name')))
// alert(users.sort(byField('age')))



const arr = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
  ['G', 'H', 'O', 'E', 'L', 'A', 'D']
];
function decode(message) {
  let rsl
  let col_len = message[0].length - 1
  let row_len = message.length - 1
  let [x, y] = [0, 0]
  let sign = -1
  while(x <= col_len) {
    console.log(y, x, message[y][x])
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
// function decode(message) {
//   // Handle empty or partial arrays early
//   if (!message.length || !message[0].length) return "";

//   let rsl = "";
//   let col_len = message[0].length - 1;
//   let row_len = message.length - 1;
//   let x = 0, y = 0;
//   let sign = -1;

//   // If there's only one row, no vertical movement is possible
//   if (row_len === 0) {
//     // Just iterate horizontally
//     while (x <= col_len) {
//       rsl += message[0][x];
//       x++;
//     }
//     return rsl;
//   }

//   // Multiple rows scenario
//   while (x <= col_len) {
//     rsl += message[y][x];

//     if (y === 0) {
//       // Top row reached, move down next time
//       y += 1;
//       sign = 1;
//     } else if (y === row_len) {
//       // Bottom row reached, move up next time
//       y -= 1;
//       sign = -1;
//     } else {
//       // Continue moving in the current sign direction
//       y += sign;
//     }

//     x += 1;
//   }
//  console.log(rsl)
//   return rsl;
// }


