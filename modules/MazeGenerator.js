class MazeGenerator {
    dimension; // Vector2

    constructor (dimension) {
        this.dimension = dimension;
    }
    
    generate() {
        var maze = []; 
        
        var visited = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            visited[i] = false;
        }

        var queue = [], neigh = [], node = new Vector2(0,0);
        queue.push(node);
        while (queue.length) {
            
            node = queue.shift();
            maze.push(node);
            
            if (node.x == 100 && node.y == 220) break;
            neigh = this.getNeighbors(node);
            neigh.forEach((n) => {
                
                if ((n != null) && (!visited[(n.x*this.dimension.x) + n.y]) && (!node.equals(n))) {
                    queue.unshift(n);
                    visited[(n.x*this.dimension.x) + n.y] = true;
                }
            });
        }

        return maze;
        
    }
    
    getNeighbors(vec) {
        var arr = [null, null, null, null];
        if (vec.x > 0) {
            arr[0] = new Vector2(vec.x-1, vec.y);
        }
        if (vec.y > 0) {
            arr[1] = new Vector2(vec.x, vec.y-1);
        }
        if (vec.x < this.dimension.x) {
            arr[2] = new Vector2(vec.x+1, vec.y);
        }
        if (vec.y < this.dimension.y) {
            arr[3] = new Vector2(vec.x, vec.y+1);
        }
        return arr;
    }

    get size(){
        return (this.dimension.x * this.dimension.y);
    }
    
}