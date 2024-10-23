class PriorityQueue {

    queue = [];
    comparator;

    // min priority by default
    constructor (comparator = (a,b) => {return a < b;}) {
        this.comparator = comparator;
    }
    

    push (element) {
        this.queue.push(element);
        this.siftUp(this.length - 1);
    }
    
    
    pop () {
        if (this.length == 1) return this.queue.pop();
        let el = this.queue[0];
        this.queue[0] = this.queue.pop();
        this.siftDown(0);
        return el;
    }

    siftDown (index) {
        let max = index, left = (2 * index) + 1, right = (2 * index) + 2;
        if (left < this.queue.length && this.comparator(this.queue[left], this.queue[max])) max = left;
        if (right < this.queue.length && this.comparator(this.queue[right], this.queue[max])) max = right;
        
        // max priority element is this one, so return
        if (max == index) return;
        let temp = this.queue[index];
        this.queue[index] = this.queue[max];
        this.queue[max] = temp;
        this.siftDown(max);
    }
    
    siftUp (index) {
        if (index == 0) return;
        let parent = Math.floor((index - 1) / 2);
        // if order isn't correct, exchange
        if (this.comparator(this.queue[index], this.queue[parent])) {
            let temp = this.queue[index];
            this.queue[index] = this.queue[parent];
            this.queue[parent] = temp;
            this.siftUp(parent);
        }
    }


    get length () {
        return this.queue.length;
    }

}