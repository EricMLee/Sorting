var arr = [];  //create empty array
var running = false;
for(var i = 0; i< 300; i+=3){ //initialize the array
    arr.push(i + 25);
}
function draw(n, color) {
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      var width = (970.0 - n.length)/n.length;
      var currX = 10;
      ctx.clearRect(0, 0, canvas.width, canvas.height);	
      for(var i = 0; i < n.length; i++){
          if(i == color){
              ctx.fillStyle = 'rgb(220, 20, 20)';
          }else{
              ctx.fillStyle = 'rgb(0, 0, 170)';
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

function* selectionSort(array){
    var min = 0;
    var temp = 0;
    var step = 0;
    var pass = 1;
    for(var i = 0; i < array.length; i++){
        min = i;
        for(var n = i; n < array.length; n++){
            draw(array, n); 
            if(array[n] < array[min]){
                yield true;
                min = n;
                step++;
            }
        }
        temp = array[i];
        array[i] = array[min];
        draw(array, i);
        yield true;
        array[min] = temp;
        draw(array, min);
        yield true;
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
                yield true;
            }
            }
            pass++
    } while (swapped);
}

function* shakerSort(array){
    var swapped;
    var step = 0;
    var pass = 1;
    var p = 0;
    do{
        swapped = false;
        for (var i = 0; i < array.length - 1 - p; i++) {
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
        for (var i = array.length - 1 - p; i > p; i--) {
            if (array[i] < array[i - 1]) {
                var temp = array[i];
                array[i] = array[i - 1];
                array[i - 1] = temp;
                swapped = true;
                step++;
                draw(array, i);
                yield swapped; // pause here
            }
        }
        p++;
        pass++
    } while (swapped);
}

function* mergeSort(arr){
    running = true;
    var a = 1;
    while(a < arr.length){
        var pos2 = a;
        var pos1 = 0;
        while(pos2 < arr.length){
            var arr1 = [];
            var arr2 = [];
            for(var i = 0; i < a; i++){
                arr1[i] = arr[pos1 + i];
                if(pos2 + i < arr.length){
                    arr2[i] = arr[pos2 + i];
                }
            }
            var x = 0;
            var y = 0;
            while(x != arr1.length && y != arr2.length){
                if(arr1[x] < arr2[y]){
                    arr[pos1 + x + y] = arr1[x];
                    draw(arr, pos1 + x + y);
                    yield true;
                    x++;
                }else{
                    arr[pos1 + x + y] = arr2[y];
                    draw(arr, pos1 + x + y);
                    yield true;
                    y++;
                }
            }
            while(x!= arr1.length){
                arr[pos1 + x + y] = arr1[x];
                draw(arr, pos1 + x + y);
                yield true;
                x++;
            }
            while(y!= arr2.length){
                arr[pos1 + x + y] = arr2[y];
                draw(arr, pos1 + x + y);
                yield true;
                y++;
            }
            pos1 += a*2;
            pos2 += a*2;
        }
        a = a * 2;
    }
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
    if(option == 4){
        var sort = shakerSort(arr);
    }
    if(option == 5 && running == false){
        running = true;
        var sort = mergeSort(arr);
    }
      function anim(ar){
        requestAnimationFrame(anim);
        sort.next(); 
      }
      setTimeout(anim(arr), 7000);
      running = false;
}


function ref(){ 
    var userIn = document.getElementById("text1").value;
    arr = [];
    if(userIn == false){
        userIn = 100;
    }else{
        if(userIn <= -1){
            userIn = 100;
        }
        if(userIn >= 512){
            userIn = 512;
        }
    }
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
document.getElementById("merge").onclick = function() {start(5);};
document.getElementById("shake").onclick = function() {start(4);};
document.getElementById("ref").onclick = function() {ref();};