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
