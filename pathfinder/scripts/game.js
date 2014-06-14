/**
 * Game Module
 *      This is the Presenter of the game.
 *      The view of the game is represented by GameView module (game-view.js)
 *      The game assembles the Board (board.js) and Position (position.js) objects.
 */
define(['board', 'position', 'game-view', 'solver-service'], function(Board, Position, GameView, SolverService){

    // TODO Discuss the difference between prototype. and this. as top down execution
    return function Game(options) {
        // Model objects that store game state
        var board = new Board(options.rows, options.cols)
        var goalPos = new Position().set(options.targetPos)
        var actorPos = new Position().set(options.startPos)

        // View object - Pass Presenter callbacks for event handling
        var gameView = new GameView(options, {
            onObstacleChange : function(isObstacle, row, col) {
                board.setObstacle(isObstacle, row, col)
                gameView.reset()
            },
            onNewStartPosition: function(row, col) {
                actorPos = new Position(row, col)
                gameView.reset()
            },
            onNewGoalPosition: function(row, col) {
                goalPos = new Position(row, col)
                gameView.reset()
            }
        })

        // Private method
        function moveActor(nextPos) {
            if (board.isValidMove(nextPos)) {
                gameView.moveActor(actorPos, nextPos)
                actorPos.set(nextPos)
            }
        }

        this.start = function() { gameView.start() }

        this.solve = function() {
            var solution = SolverService.solve(board, actorPos, goalPos)
            solution.forEach(function(position) {
                moveActor(position)
            })
        }

    }

})