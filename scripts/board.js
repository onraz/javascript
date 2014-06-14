/**
 * board.js
 *      lightweight model of a 2d grid
 *      A board can have obstacles that can't be travelled through
 */
define(['position'], function(Position) {

    return function Board(rows, cols) {
        var grid = new Array(rows)
        var SquareType = {Open: 0, Closed:1}

        // initialise board model
        for (var row = 0; row < rows; row++) {
            grid[row] = new Array(cols);
            for (var col = 0; col < cols; col++) {
                grid[row][col] = SquareType.Open
            }
        }

        this.getRows = function() { return rows }
        this.getCols = function() { return cols }

        this.setObstacle = function (isObstacle, row, col) {
            grid[row][col] = isObstacle ? SquareType.Closed : SquareType.Open
        }

        this.isObstacle = function (row, col) {
            return grid[row][col] == SquareType.Closed
        }

        this.isValidMove = function(nextPos) {
            if (nextPos.isOutside(rows, cols)) {
                return false
            } else {
                return !this.isObstacle(nextPos.row, nextPos.col)
            }
        }

        /**
         * Find the accessible neighbours of the given tile
         * @param pos
         * @returns {Array}
         */
        this.neighbours = function(pos) {
            var nodes = [
                pos.clone().right(),
                pos.clone().down(),
                pos.clone().left(),
                pos.clone().up()
            ]
            var neighbours = []
            nodes.forEach(function(node){
                if (this.isValidMove(node)) {
                    neighbours.push(node)
                }
            }, this)
            return neighbours
        }
    }
})