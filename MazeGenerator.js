class MazeGenerator {
    width;
    height;
    constructor (width, height) {
        this.width = width;
        this.height = height;
    }
    
    generate() {
        var arr = this.getNeighbors(0,6);
        alert(arr[0] + " " + arr[1]);
        alert(arr[2] + " " + arr[3]);
        var queue = [], neigh = [], node = [0,0];
        queue.push(node);
        while (queue.length) {
            node = queue.shift();
            console.log(node);
            neigh = this.getNeighbors();
            neigh.forEach((n)=>{
                if ((n != null) || (n != node)) {
                    queue.push(n);
                }
            });
            
            
        }
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
    
}