class MazeGenerator {
    width;
    height;
    constructor (width, height) {
        this.width = width;
        this.height = height;
    }
    
    generate() {
        var maze = []; 

        var visited = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            visited[i] = false;
        }

        var queue = [], neigh = [], node = [0,0];
        queue.push(node);
        while (queue.length) {
            
            node = queue.shift();
            maze.push(node);

            if (node[0] == 100 && node[1] == 220) break;
            neigh = this.getNeighbors(node[0], node[1]);
            neigh.forEach((n) => {

                if ((n != null) && (!visited[(n[0]*this.width) + n[1]]) && ((n[0] != node[0]) || (n[1] != node[1]))) {
                    queue.unshift(n);
                    visited[(n[0]*this.width) + n[1]] = true;
                    console.log(n);
                }
            });
        }

        return maze;
    }
    
    getNeighbors(x, y) {
        var arr = [null, null, null, null];
        if (x > 0) {
            arr[0] = [x-1, y];
        }
        if (y > 0) {
            arr[1] = [x, y-1];
        }
        if (x < this.width) {
            arr[2] = [x+1, y];
        }
        if (y < this.height) {
            arr[3] = [x, y+1];
        }
        return arr;
    }

    get size(){
        return (this.width * this. height);
    }
    
}