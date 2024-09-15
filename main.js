


function main () {
    var canvas = document.getElementById("cnvs");
    var ctx = canvas.getContext("2d");
    
    // var imgData = new ImageData(255, 255);

    var n = 32;
    
    var canvasDim = new Vector2(n, n);
    var mazeGen = new MazeGenerator(canvasDim);
    var maze = mazeGen.generate();
    
    
    
    // console.log(maze);
    var strokeStyles = [
        // "#00ff00",
        "#ffffff",
        // "#ff0000",
        // "#0000ff",
    ];
    ctx.lineWidth = 6;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    
    var i = 0;
    drawMaze();
    
    function drawMaze() {
        ctx.strokeStyle = strokeStyles[i % strokeStyles.length]
        
        ctx.lineTo(256/n*maze[i].x, 256/n*maze[i].y);
        ctx.stroke();
        i++;
        if (i < maze.length) {
            setTimeout(() => {
                drawMaze();
            }, 10);
        } else {
            // location.reload();
        }
    }
    // console.log (imgData.data);
    // ctx.putImageData(imgData, 0, 0);
}



// adding a swap method to Array prototype for ease
Array.prototype.swap = function(i, j) {
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
}




main();