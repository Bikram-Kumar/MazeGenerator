class Vector2 {
    x;
    y;

    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    // compare this vector with vec
    equals(vec) {
        return ((this.x == vec.x) && (this.y == vec.y));
    }
}