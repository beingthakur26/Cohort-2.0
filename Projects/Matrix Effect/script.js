const para = document.querySelector("p");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const text = para.innerText;
let iteration = 0

// para.addEventListener("mouseenter", () => {
//   setInterval(() => {
//     const str = text.split("").map((char, index) => {
//       if(index < iteration){
//         return char
//       }
//       return characters.split("")[Math.floor(Math.random() * 53)]
//     }).join("");
//     para.innerText = str;
//     iteration += 0.2
//   }, 30);
// })

const RandomText = () => {
  const str = text.split("").map((char, index) => {
    if(index < iteration){
      return char
    }
    return characters.split("")[Math.floor(Math.random() * 53)]
  }).join("");
  para.innerText = str;
  iteration += 0.2
}
setInterval(RandomText, 40);