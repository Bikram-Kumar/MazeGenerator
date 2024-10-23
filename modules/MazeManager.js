class MazeManager {
    dimension; // Vector2
    maze;

    constructor (dimension) {
        this.dimension = dimension;
    }


    // generates a new maze and stores it in `this.maze`
    generate() {
        this.maze = []; 
        var size = this.size;
        
        var visited = new Array(size); 

        var neigh = [], node = new Vector2(0,0);
        var stack = [node];
        var index;
        while (stack.length) {
            
            node = stack.pop();
            index = this.getIndexOf(node);
            
            if (!visited[index]) {
                visited[index] = true;
            }
            
            this.maze.push(node);
            
            neigh = this.getNeighbors(node);
            MazeManager.randomizeNeighborsArray(neigh);
            
            for (let n of neigh) {
                if ((n != null) && (!visited[this.getIndexOf(n)])) {
                    stack.push(node);
                    stack.push(n);
                    break;
                }
            }
            

        }
        
    }


    // finds and returns path between `start` and `end` nodes in `maze`
    findPath(start, end, maze = this.maze) {
        var path = [];
        var size = this.size;
        var neighbors = new Array(size);
        var index; // variable used to store temporary indices
        
        // setup neighbors array from maze data for each node
        for (let i = 0; i < maze.length - 1; i++) {
            index = this.getIndexOf(maze[i]);
            if (neighbors[index] == undefined) {
                neighbors[index] = [maze[i+1]];
            } else {
                neighbors[index].push(maze[i+1]);
            }
        }
        
        var node, nodeDist;
        var queue = [start];
        var prev = new Array(size);
        var distances = new Array(size);
        distances[this.getIndexOf(start)] = 0;
        
        while (queue.length) {
            node = queue.shift();

            index = this.getIndexOf(node);
            
            path.push(node);

            
            for (let n of neighbors[index]) {
                index = this.getIndexOf(n);
                nodeDist = distances[this.getIndexOf(node)] + 1;
                
                if (distances[index] == undefined) {
                    
                    distances[index] = nodeDist;
                    prev[index] = node;
                    queue.push(n);
                    if (Vector2.areEqual(node, end)) {
                        break;
                    }
                    
                }
            }
        }

        // console.log(path);

        return prev;
    }





    
    getNeighbors(vec) {
        var arr = [null, null, null, null];
        if (vec.x > 0) {
            arr[0] = new Vector2(vec.x-1, vec.y);
        }
        if (vec.y > 0) {
            arr[1] = new Vector2(vec.x, vec.y-1);
        }
        if (vec.x < (this.dimension.x - 1)) {
            arr[2] = new Vector2(vec.x+1, vec.y);
        }
        if (vec.y < (this.dimension.y - 1)) {
            arr[3] = new Vector2(vec.x, vec.y+1);
        }
        return arr;
    }

    // randomize array by swapping random elements 2 times
    static randomizeNeighborsArray(arr) {
        var rands = [];
        for (let i = 0; i < 4; i++) {
            rands[i] = Math.floor(Math.random() * 4);
        }
        arr.swap(rands[0], rands[1]);
        arr.swap(rands[2], rands[3]);
    }


    // returns a unique index to assign to the node in graph
    getIndexOf(node) {

        return (node.x + (node.y * this.dimension.x));

    }

    get size(){
        return (this.dimension.x * this.dimension.y);
    }


    
}