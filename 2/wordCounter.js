function func1(){
    let input = document.getElementById('userText');
    let str = input.value;
    if(str.length>150){
        input.value = '';
        updateCounter(0);
    }else{
        updateCounter(str.length);
    }
}
function updateCounter(l){
    let ctr = document.getElementById('counter');
    ctr.innerHTML = l;
}