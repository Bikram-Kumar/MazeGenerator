

class Main {
    
    static mazeDim;
    static drawSpeed;
    static ctx;
    static strokeStyles;
    static mazeGen;
    static start;
    static end;
    static controls;




    static main () {

        
        this.ctx = document.getElementById("cnvs").getContext("2d");

        // this.ctx.canvas.width = 512;
        // this.ctx.canvas.height = 512;
        
        
        
        var bgimg = document.querySelector("img");
        var bg = this.ctx.createPattern(bgimg, "repeat");
        

        this.strokeStyles = [
            // "#00ff00",
            "#ffffff",
            // bg,
            // "#ff0000",
            // "#0000ff",
        ];
        
        this.initialize();
        
        
    }

    static initialize() {
        var mazeWidthInput = document.getElementById("maze-width-input");
        var mazeHeightInput = document.getElementById("maze-height-input");
        var mazeGapInput = document.getElementById("maze-gap-input");
        var speedController = document.getElementById("speed-controller");
        var generateBtn = document.getElementById("generate-btn");
        var solveBtn = document.getElementById("solve-btn");
    
        mazeWidthInput.oninput = () => {
            Main.mazeDim.x = mazeWidthInput.value;
            this.ctx.canvas.width = mazeGapInput.value * mazeWidthInput.value;
        }


        mazeHeightInput.oninput = () => {
            Main.mazeDim.y = mazeHeightInput.value;
            this.ctx.canvas.height = mazeGapInput.value * mazeHeightInput.value;
        }
        
        
        mazeGapInput.oninput = () => {
            mazeHeightInput.oninput();
            mazeWidthInput.oninput();
        }





        speedController.oninput = () => {Main.drawSpeed = 200 - speedController.value;}
        generateBtn.onclick = () => {Main.generateMaze();}
        solveBtn.onclick = () => {Main.solveMaze();}
    
        Main.mazeDim = new Vector2(mazeWidthInput.value, mazeHeightInput.value);

        // sync values
        speedController.oninput();
        mazeGapInput.oninput();


        this.controls = [mazeWidthInput, mazeHeightInput, mazeGapInput, generateBtn, solveBtn];
    
    
        // adding a swap method to Array prototype for ease
        Array.prototype.swap = function(i, j) {
            var temp = this[i];
            this[i] = this[j];
            this[j] = temp;
        }
    
    }
    
    
    static generateMaze () {
        this.setControlsState(false);
        
        this.start = new Vector2(0, Math.floor(Math.random()*this.mazeDim.y));
        this.end = new Vector2(this.mazeDim.x-1, Math.floor(Math.random()*this.mazeDim.y));
        
        var width = this.ctx.canvas.width;
        var height = this.ctx.canvas.height;
        var ctx = this.ctx;
        
        this.mazeGen = new MazeManager(this.mazeDim)
        this.mazeGen.generate();
        var maze = this.mazeGen.maze;
        
        
        
        
        
        // console.log(maze);
        ctx.clearRect(0, 0, width, height);

        ctx.lineWidth = width/this.mazeDim.x*0.5;
        ctx.beginPath();
        ctx.moveTo(0+ctx.lineWidth/2, 0+ctx.lineWidth/2);
        
        var i = 0;
        drawMaze();
        
        
 
        
        function drawMaze() {
            ctx.strokeStyle = Main.strokeStyles[i % Main.strokeStyles.length];
            ctx.lineTo((width/Main.mazeDim.x*maze[i].x)+ctx.lineWidth/2, (height/Main.mazeDim.y*maze[i].y) + ctx.lineWidth/2);
            ctx.stroke();
    

            // draw start and end nodes each time so that it does not get overridden
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(Main.start.x, height/Main.mazeDim.y*Main.start.y, ctx.lineWidth, ctx.lineWidth);
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(width/Main.mazeDim.x*Main.end.x, height/Main.mazeDim.y*Main.end.y, ctx.lineWidth, ctx.lineWidth);
            
            i++;
            if (i < maze.length) {
                setTimeout(() => {
                    drawMaze();
                }, Main.drawSpeed);
            } else {
                Main.setControlsState(true);
            }
        }
    


    }

    static solveMaze () {
        this.setControlsState(false);

        var width = this.ctx.canvas.width;
        var height = this.ctx.canvas.height;
        var ctx = this.ctx;


        var i = Main.mazeGen.getIndexOf(Main.end);

        ctx.beginPath();
        ctx.moveTo(width/Main.mazeDim.x*Main.end.x+ctx.lineWidth/2, height/Main.mazeDim.y*Main.end.y+ctx.lineWidth/2);
               
        var path = this.mazeGen.findPath(this.start, this.end);
        drawPath();

        function drawPath() {
            ctx.strokeStyle = "#00ff00";
            
            ctx.lineTo((width/Main.mazeDim.x*path[i].x)+ctx.lineWidth/2, (height/Main.mazeDim.y*path[i].y) + ctx.lineWidth/2);
            ctx.stroke();
            i = Main.mazeGen.getIndexOf(path[i]);
            
            if (path[i] != undefined) {
                setTimeout(() => {
                    drawPath();
                }, Main.drawSpeed);
            } else {
                Main.setControlsState(true);
            }
        }
    }


    static setControlsState (shouldWork) {
        if (shouldWork) {
            for (let i = 0; i < this.controls.length; i++) {
                this.controls[i].removeAttribute("disabled");
            }
        } else {
            for (let i = 0; i < this.controls.length; i++) {
                this.controls[i].setAttribute("disabled", "");
            }
        }
    }

    
}











window.onload = () => {Main.main();};
