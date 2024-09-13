main();



function main () {
    var canvas = document.getElementById("cnvs");
    var ctx = canvas.getContext("2d");
    
    var imgData = new ImageData(256, 256);
    
    var canvasDim = new Vector2(256, 256);
    var mazeGen = new MazeGenerator(canvasDim);
    var maze = mazeGen.generate();


    for (var i = 0; i < maze.length; i++) {
        var index = 4 * ((maze[i].x * 256) + maze[i].y);
        imgData.data[index] = 255;
        imgData.data[index+1] = i;
        imgData.data[index+2] = 105;
        imgData.data[index+3] = 255;
    }
    console.log (imgData.data);
    ctx.putImageData(imgData, 0, 0);
}