/**
 * solver.js
 *      Find a path to a goal given starting position within a graph
 */
define(function(){

    /**
     * Walk the board to find the target node
     *  Implements a breadth first search to the goal Node
     *
     * @returns the targetNode if found, otherwise NULL
     */
    function walk(board, startPos, goalPos) {

        var queue = []
        var visited = []

        queue.push(startPos)

        while (queue.length > 0) {
            var currentNode = queue.pop()
            if (currentNode.equals(goalPos)) {
                return currentNode
            } else if (!visited[currentNode.key()]) {
                board.neighbours(currentNode).forEach(function(neighbour){
                    neighbour.previous = currentNode
                    if (!visited[neighbour.key()]) {
                        queue.push(neighbour)
                    }
                })
            }
            visited[currentNode.key()] = true
        }
        return null
    }


    return {
        /**
         * Find the solution for a given board with start & goal position
         *
         * @returns {Array}
         */
        solve: function (board, startPos, goalPos) {
            var targetNode = walk(board, startPos, goalPos)
            var solution = []
            if (targetNode) {
                var solvedNode = targetNode
                while (solvedNode) {
                    solution.unshift(solvedNode)
                    solvedNode = solvedNode.previous
                }
            }
            return solution
        }
    }
})