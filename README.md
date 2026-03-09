1️⃣ What is the difference between var, let, and const?
Ans. :-
(var → Old way to declare variables in JavaScript. It can be redeclared and updated.
let → Modern way. It can be updated but cannot be redeclared in the same scope.
const → Used for values that should not change. It cannot be updated or redeclared.)

2️⃣ What is the spread operator (...)?
Ans. :-
The spread operator (...) is used to expand or copy elements from an array or object.

Example:
        const arr1 = [1,2];
        const arr2 = [...arr1,3]; 
             (result: [1,2,3])

3️⃣ What is the difference between map(), filter(), and forEach()?
Ans. :-

(map() → Creates a new array by changing each item.
filter() → Creates a new array with selected items based on a condition.
forEach() → Runs a function for each item but does not return a new array.)

4️⃣ What is an arrow function?
Ans. :-
An arrow function is a shorter way to write functions in JavaScript.

Example:
       ( const add = (a, b) => a + b; )

5️⃣ What are template literals?
Ans. :-
Template literals allow you to write strings with variables easily using backticks ` `.

Example:
        const name = "Rahim";
        console.log(`Hello ${name}`);
