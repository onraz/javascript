define(function(){

    return function Position(x, y) {
        this.row = x || 0
        this.col = y || 0

        this.set = function(pos) {
            this.row = pos.row
            this.col = pos.col
            return this
        }

        this.equals = function(pos) {
            return this.row == pos.row && this.col == pos.col
        }

        this.clone = function() {
            return new Position(this.row, this.col)
        }

        this.isOutside = function(rows, cols) {
            return this.row < 0 || this.col < 0 || this.row >= rows || this.col >= cols
        }

        this.toString = function() {
            return "[" + this.row + "," + this.col + "]"
        }

        this.key = function() {
            return "[" + this.row + "," + this.col + "]"
        }

        this.left = function() {
            this.col--
            return this
        }

        this.right = function() {
            this.col++
            return this
        }

        this.up = function() {
            this.row--
            return this
        }

        this.down = function() {
            this.row++
            return this
        }

    }

})