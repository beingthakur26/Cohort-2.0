var btn = document.getElementById("btn");
var box = document.getElementById("box");

// btn.addEventListener("click", function(){
//     var randomColor = Math.floor(Math.random()*16777215).toString(16);
//     box.style.backgroundColor = "#" + randomColor;
// })


btn.addEventListener("click", function(){
    var randomColor1 = Math.floor(Math.random()*256)
    var randomColor2 = Math.floor(Math.random()*256)
    var randomColor3 = Math.floor(Math.random()*256)
    box.style.backgroundColor = `rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`
    box.innerText = `rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`
})