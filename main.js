


function main () {
    var canvas = document.getElementById("cnvs");
    var width = 256;
    var height = 256;
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    
    // var imgData = new ImageData(255, 255);

    var n = 16;
    
    var canvasDim = new Vector2(n, n);
    var mazeGen = new MazeManager(canvasDim);
    mazeGen.generate();
    var maze = mazeGen.maze;
    var start = new Vector2(0, 0);
    var end = new Vector2(n-1, n-1);
    var path = mazeGen.findShortestPath(start, end);
    
    
    
    // console.log(maze);
    var strokeStyles = [
        // "#00ff00",
        "#ffffff",
        // "#ff0000",
        // "#0000ff",
    ];
    ctx.lineWidth = width/n*0.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(0+ctx.lineWidth/2, 0+ctx.lineWidth/2);
    
    var i = 0, time = 100;
    drawMaze();
    
    function drawMaze() {
        ctx.strokeStyle = strokeStyles[i % strokeStyles.length];
        
        ctx.lineTo((width/n*maze[i].x)+ctx.lineWidth/2, (height/n*maze[i].y) + ctx.lineWidth/2);
        ctx.stroke();
        
        i++;
        if (i < maze.length) {
            setTimeout(() => {
                drawMaze();
            }, time);
        } else {
            i = mazeGen.getIndexOf(end);
            // location.reload();
            // maze = path;
            // i = 0;
            // ctx.clearRect(0,0,width,height);
            // ctx.lineWidth = 1;
            ctx.beginPath();
            time = 100;
            drawPath();
            // drawMaze();
        }
    }



    function drawPath() {
        ctx.strokeStyle = "#00ff00";
        
        ctx.lineTo((width/n*path[i].x)+ctx.lineWidth/2, (height/n*path[i].y) + ctx.lineWidth/2);
        ctx.stroke();
        i = mazeGen.getIndexOf(path[i]);
        
        if (path[i] != undefined) {
            setTimeout(() => {
                drawPath();
            }, time);
        } else {
            // location.reload();
        }
    }
 
}



// adding a swap method to Array prototype for ease
Array.prototype.swap = function(i, j) {
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
}




main();