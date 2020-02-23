var arr = [];  //create empty array
for(var i = 0; i< 300; i+=3){ //initialize the array
    arr.push(i + 25);
}
function draw(n, color) {
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      var width = (920.0 - n.length)/n.length;
      var currX = 10;
      ctx.clearRect(0, 0, canvas.width, canvas.height);	
      for(var i = 0; i < n.length; i++){
          if(i == color){
              ctx.fillStyle = 'red';
          }else{
              ctx.fillStyle = 'blue';
          }
          var h = n[i];
          ctx.fillRect(currX, canvas.height - h, width, h);
          currX += width + 1;
      }
    }
}
function* insertionSort(arr){
    var swapped;
    var step = 0;
    var pass = 1;
    if(arr.length > 1){
        var spot;
        var temp;
        for(var i = 1; i < arr.length; i++){
            swapped = false;
            spot = i;
            for(var n = i - 1; n >= 0; n--){
                if(arr[i] <= arr[n]){
                    spot = n;
                    swapped = true;
                }
            }
            temp = arr[i];
            for(var n = i - 1; n >= spot; n--){
                arr[n+1] = arr[n];
                step++;
                draw(arr, n+1);
                yield swapped;
            }
            arr[spot] = temp;
            draw(arr, spot);
            yield swapped;
            pass++
        }
    }
}
/*
void insertionSort (int *array, size_t count) {
    if(count <= 1)
        return;    int spot;
    int temp;
    for(int i = 1; i < count; i++){
        spot = i;
        for(int n = i-1; n>=0; n--){
            if(*(array+i)<=*(array+n)){
                spot = n;
            }
        }
        temp = *(array + i);
        for(int n = i-1; n >= spot; n--){
            *(array + n + 1) = *(array + n);
        }
        *(array + spot)=temp;
        
    }
}
*/


function* selectionSort(array){
    var min = 0;
    var temp = 0;
    var swapped;
    var step = 0;
    var pass = 1;
    for(var i = 0; i < array.length; i++){
        min = i;
        swapped = false;
        for(var n = i; n < array.length; n++){
            if(array[n] < array[min]){
                min = n;
                swapped = true;
                step++;
            }
        }
        temp = array[i];
        array[i] = array[min];
        array[min] = temp;
        draw(array, i);
        yield swapped;
        pass++
    }
}

function* bubbleSort(array) {
    var swapped;
    var step = 0;
    var pass = 1;
    do{
        swapped = false;
        for (var i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
                step++;
                draw(array, i);
                yield swapped; // pause here
            }
        }
        pass++
    } while (swapped);

}

function start(option){
    canvas = document.getElementById('myCanvas');
    if(option == 1){
        var sort = insertionSort(arr);
    }
    if(option == 2){
        var sort = bubbleSort(arr);
    }
    if(option == 3){
        var sort = selectionSort(arr);
    }
      function anim(ar){
        requestAnimationFrame(anim);
        sort.next(); 
      }
      setTimeout(anim(arr), 7000);
}


function ref(){ 
    var userIn = document.getElementById("text1").value;
    arr = [];
    var x = 400/userIn;
    for(var i = 0; i< userIn; i++){ 
        arr.push(x);
        x+= (400 / userIn);
    }
    shuffle(arr);
    draw(arr, 0);
}

function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

window.onload = function(){
    canvas = document.getElementById('myCanvas');
    draw(arr, 0);
}
document.getElementById("bubble").onclick = function() {start(2);};
document.getElementById("select").onclick = function() {start(3);};
document.getElementById("insert").onclick = function() {start(1);};
document.getElementById("ref").onclick = function() {ref();};