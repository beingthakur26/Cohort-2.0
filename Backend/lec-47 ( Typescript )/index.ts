/**
 * @TypeScript me data types ka use variables, function parameters, aur return values ke types ko specify karne ke liye hota hai. TypeScript me kuch common data types hote hain, jaise ki: 
 * different data types ke alawa, TypeScript me type aliases, interfaces, aur classes bhi hote hain jo complex data structures ko define karne ke liye use kiye jate hain. TypeScript me type annotations ka use karke hum apne code ko zyada robust aur maintainable bana sakte hain, kyunki TypeScript compile time par type checking karta hai aur potential errors ko identify karta hai.
 * types : string, number, boolean, array, object, tuple, void, never
 * type
 * any, unknown
*/


/**
 * @string : string, string ek data type hai jo text ko represent karta hai. String literals ko double quotes ("") ya single quotes ('') ke andar likha jata hai.
*/
const a: string = "hello world";
console.log(a);

/**
 * @number : number, number ek data type hai jo numeric values ko represent karta hai. Isme integers, floating-point numbers, aur special numeric values (jaise NaN aur 
 * Infinity) shamil hote hain.
*/
const b: number = 123;
console.log(b);

/**
 * @boolean : boolean, boolean ek data type hai jo true ya false ke roop mein logical values ko represent karta hai. Iska use conditional statements aur logical operations mein 
 * hota hai.
*/
const c: boolean = true;
console.log(c);

/**
 * @array : number[], string[], boolean[] or (string | number)[], array ek data type hai jo ek sequence of values ko represent karta hai. Array ke elements same type ke hote 
 * hain aur unhe square brackets [] ke andar likha jata hai.
*/
const d: number[] = [1, 2, 3, 4, 5];
d.push(29)
console.log(d);

/**
 * @object : { name: string; age: number }, object ek data type hai jo key-value pairs ko represent karta hai. Isme keys string hoti hain aur unke corresponding values kisi bhi 
 * type ke ho sakte hain.
*/
const e: { name: string; age: number } = {
  name: "John",
  age: 30,
};
console.log(e);

/**
 * @tuple : [string, number], tuple ek data type hai jo fixed number of elements ko represent karta hai, jisme har element ka type alag ho sakta hai. Tuple ke elements ko 
 * square brackets [] ke andar likha jata hai.
 */
const f: [string, number] = ["hello", 123];
console.log(f);

/**
 * @void : void, void ek data type hai jo function ke return type ko represent karta hai jab function kuch return nahi karta hai. Iska use functions ke return type ko specify 
 * karne ke liye hota hai.
 */
function greet(name: string): void {
  console.log("Hello, " + name);
}
greet("Alice");

/**
 * @never : never, never ek data type hai jo function ke return type ko represent karta hai jab function kabhi return nahi karta hai. Iska use functions ke return type ko  
 * specify karne ke liye hota hai, jaise ki error throw karne wale functions.
 */
function h(): never {
  throw new Error("This function never returns");
}

/**
 * @type aliases : type aliases, type aliases ek feature hai jo complex types ko ek naam dene ke liye use kiya jata hai. Iska use code ko zyada readable aur maintainable banane ke liye hota hai. Type aliases ko type keyword ke sath define kiya jata hai, aur unhe kisi bhi type ke liye use kiya ja sakta hai, jaise ki primitive types, object types, aur even union types.
 * type ko tum pehle define kar sakte ho, aur uske baad us naam ka use karke us type ko refer kar sakte ho. Type aliases ka use complex types ko simplify karne ke liye hota hai, jaise ki object types, union types, aur intersection types.
 * type use karke hum apne code ko zyada modular aur reusable bana sakte hain, kyunki hum ek complex type ko ek naam de sakte hain aur us naam ka use karke us type ko baar-baar refer kar sakte hain.
 * 
 */
type USER = { name: string; age: number, isMale: boolean };

const user: USER = {
  name: "Alice",
  age: 25,
  isMale: false,
};

function greets(data: USER): void {
  console.log("Hello, " + data.name + "! You are " + data.age + " years old and " + (data.isMale ? "male" : "female") + ".");
}  

greets(user);

/**
 * @any : any ek data type hai jo kisi bhi type ki value ko represent kar sakta hai. Iska use tab hota hai jab hume kisi variable ke type ke baare mein pata nahi hota hai, ya jab hume kisi variable ko multiple types ke values assign karni hoti hain. Any type ka use karne se TypeScript ki type checking disable ho jati hai, isliye iska use carefully karna chahiye.
 */
let x: any;

x = "hello";
console.log(x.toUpperCase()); // Output: "HELLO"

x = 123;
console.log(x.toFixed(2)); // Output: "123.00"

/**
 * @unknown : unknown ek data type hai jo kisi bhi type ki value ko represent kar sakta hai, lekin iske sath koi bhi operation perform nahi kiya ja sakta hai jab tak us value ka type check na kiya jaye. Iska use tab hota hai jab hume kisi variable ke type ke baare mein pata nahi hota hai, ya jab hume kisi variable ko multiple types ke values assign karni hoti hain, lekin hum chahte hain ki TypeScript ki type checking enabled rahe.
 */
let y: unknown
y = 'hello'

if ((typeof y) === "string")
    console.log(y.toUpperCase()
) // Output: "HELLO"
