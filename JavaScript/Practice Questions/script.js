//  LEVEL 1 : Beginner Practice

// Question 1 - print numbers from 1 to 10 
// for(i = 1; i <= 10; i++ ){
//     console.log(i)
// }


// Question 2 - print only even numbers from 1 to 20
// for(i =1; i <= 20; i++){
//     if(i % 2 === 0) {
//         console.log(i)
//     }
// }


// Questions 3 - Print number from 10 to 1
// for(i = 10; i>=1 ; i--){
//     console.log(i)
// }


// Questions 4 - Print the word yes 5 times
// for(i= 1; i<= 5; i++){
//     console.log("yes")
// }


// Question 5 -print whether numbr from 1 to 10 are even or odd
// for(i = 1; i <= 10; i++){
//     if(i % 2 === 0){
//         console.log(`${i} is Even`)
//     } else {
//         console.log(`${i} is Odd`)
//     }
// }


// Questions 6 - ask user for a number and say if it's positive or negstive
// let num = prompt("Enter any Integer : ")
// num = parseInt(num)
// if(num < 0){
//     console.log("Negative Number")
// } else{
//     console.log("Positive Number")
// }


// Question 7 - Ask user's age and check if eligible to vote
// let age = prompt("Enter your age : ")
// age = parseInt(age)
// if (age >= 18) {
//     console.log("Eligible for vote")
// } else {
//     console.log("Not eligible")
// }


// Question 8 - Print multilpication table of 5 
// for(i = 1; i <= 10; i++ ) {
//     console.log( `5 * ${i} = ${ 5 * i}`)
// }

// let num = prompt("Enter number: ")
// console.log(`Table of ${num} : \n `)
// for(i = 1; i <= 10; i++) {
//     console.log(num * i)
// }


// Question 9 - Count how many numbers between 1 and 15 are greater than 8 
// let count = 0
// for(i= 1; i< 16; i++){
//     if(i > 8){
//         count++
//     }
// }
// console.log(count)


// Question 10 - Ask user for password and print access status
// Hardcoded correct password. Compare with user input.
// var pass = prompt("Enter Password : ")
// if(pass === "manas"){
//     console.log("Password is Correct.")
// } else {
//     alert("Enter correct password")
//     console.error("Enter correct password.")
// }

// ---------------------------------------------------------------------------

// Level 2 -slightly tougher but logical

// Question 11 - Allow only 3 attempts to enter correct password
// If user gets it right early, stop. If not → “Account locked”
// let attempts = 0
// let pass = "manas"
// let enter = prompt("Enter Passwod")
// attempts++
// while(pass !== enter){
//     if(attempts === 3) {
//         console.error("account blocked")
//         break
//     } 
//     enter = prompt("Enter Passwod")
//     attempts++
// }
// if(pass === enter){
//     console.log("password matched")
// }



// Question 12 - Ask user for words until they type “stop”. Count how many times they typed “yes”
// Loop until "stop" is typed. Count "yes".
// let count = 0
// let word = prompt("Enter any word : ")
// while(word !== "stop") {
//     if(word === "stop") break
//     word = prompt("Enter any word : ")
//     count++
// }
// console.log(`You typed ${count} times`)


// Question 13 - Print numbers divisible by 7 from 1 to 50
// Use modulo % and loop.
// let num = prompt("Enter any number : ")
// num = parseInt(num)
// for(i =1; i <= 50; i++){
//     if(i % num === 0){
//         console.log(i)
//     }
// }


// Question 14 - Sum of all odd numbers from 1 to 30
// Add only odd numbers. Print final sum.
// let sum = 0
// for(i =1; i <= 30; i++){
//     if(i % 2 !== 0){
//         sum += i
//     }   
// }
// console.log(`Sum of all odd numbers from 1 to 30 is ${sum}`)


// Question 15 - Keep asking number until user enters an even number
// Use while loop. Stop only if input is even.
// let num = prompt("Enter any number : ")
// num = parseInt(num)
// while(num % 2 !== 0){
//     if(num % 2 === 0) break
//     num = prompt("Enter any number : ")
//     num = parseInt(num)
// }
// console.log("You entered even number")


// Question 16 - Print numbers between two user inputs
// Input start and end using prompt() → print all between.
// let num1 = prompt("Enter starting number : ")
// let num2 = prompt("Enter ending number : ")
// num1 = parseInt(num1)
// num2 = parseInt(num2)
// for(i = num1; i <= num2; i++){
//     console.log(i)
// }


// Question 17 - Print only first 3 odd numbers from 1 to 20
// Use loop. Stop with break after 3 odd prints.
// let count = 0
// for(i = 1; i <= 20; i++){
//     if(i % 2 !== 0){
//         console.log(i)
//         count++
//     }
//     if(count === 3) break
// }

// Question 18 - Ask user 5 numbers. Count how many are positive
// Use loop + condition + counter.
// let count = 0;
// for(let i = 1; i <= 5; i++) {
//     let num = parseInt(prompt(`Enter number ${i} : `));
//     if(num > 0) count++;
// }
// console.log(`You entered ${count} positive numbers`);
// console.log(`You entered ${5 - count} negative numbers`);

// Question 19 - ATM Simulator – Allow 3 withdrawals
// Start with ₹1000 balance. Ask withdrawal amount 3 times.
// If enough balance → deduct
// Else → print “Insufficient balance”
let balance = 1000;
for(let i = 1; i <= 3; i++) {
    let withdraw = parseInt(prompt(`Enter withdrawal amount ${i} : `));
    if(withdraw <= balance) {
        balance -= withdraw;
        console.log(`Withdrawal successful. Remaining balance: ₹${balance}`);
    } else {
        console.log("Insufficient balance");
    }
}