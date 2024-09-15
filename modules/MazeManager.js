class MazeManager {
    dimension; // Vector2
    maze;

    constructor (dimension) {
        this.dimension = dimension;
    }


    // generates a new maze and stores it in `this.maze`
    generate() {
        this.maze = []; 
        
        var visited = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            visited[i] = false;
        }

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
            
            for (var n of neigh) {
                if ((n != null) && (!visited[this.getIndexOf(n)]) && (!Vector2.areEqual(n, node))) {
                    stack.push(node);
                    stack.push(n);
                    break;
                }
            }
            

        }
        
    }


    // finds and returns shortest path between `start` and `end` nodes in current `this.maze`
    findShortestPath(start, end) {
        var path = [];


        return path;
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