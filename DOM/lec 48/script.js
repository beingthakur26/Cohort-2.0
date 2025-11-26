var aud = new Audio('./31.mp3')

var h1 = document.querySelector('h1')

document.addEventListener('keydown',function(dets){
    if(dets.code == 'KeyH'){
        aud.play()
    }
})