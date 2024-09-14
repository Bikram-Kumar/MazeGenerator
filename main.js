


function main () {
    var canvas = document.getElementById("cnvs");
    var ctx = canvas.getContext("2d");
    
    // var imgData = new ImageData(255, 255);

    var n = 8;
    
    var canvasDim = new Vector2(n, n);
    var mazeGen = new MazeGenerator(canvasDim);
    var maze = mazeGen.generate();
    
    
    
    // console.log(maze);
    var fillStyles = [
        "#00ff00",
        "#ffffff",
    ];
    
    var i = 0;
    drawMaze();

    function drawMaze() {
        ctx.fillStyle = fillStyles[i % fillStyles.length]
        
        ctx.fillRect(256/n*maze[i].x, 256/n*maze[i].y, (256/n)/2, (256/n)/2);
        
        i++;
        if (i < maze.length) {
            setTimeout(() => {
                drawMaze();
            }, 100);
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