define(['jquery', 'position'], function($, Position){

    return function GameView(options, game) {

        var $board = $(options.target)

        function setupPiece($piece, $location) {
            $piece.offset({ top: $location.offset().top, left: $location.offset().left })
            $piece.draggable({
                snap: ".square",
                containment: options.target,
                opacity: 0.5,
                revert: "invalid"
            })
        }

        function setupSquare() {
            // clicking on square tiles make them obstacle
            $board.find(".square").click(function () {
                var $square = $(this)
                $square.toggleClass('square-obstacle')
                var isObstacle = $square.hasClass('square-obstacle')
                if (isObstacle) {
                    $square.droppable("option", "disabled", true)
                } else {
                    $square.droppable("option", "disabled", false)
                }

                game.onObstacleChange(isObstacle, $square.attr('row'), $square.attr('col'))
            })

            $board.find('.target').droppable({
                drop: function (event, ui) {
                    var $square = $(this)
                    if (ui.draggable.hasClass('start')) {
                        game.onNewStartPosition($square.attr('row'), $square.attr('col'))
                    } else {
                        game.onNewGoalPosition($square.attr('row'), $square.attr('col'))
                    }
                }
            })
        }

        function getSquare(pos) {
            return $board.find('.square[row=' + pos.row + '][col=' + pos.col + ']')
        }


        this.start = function() {
            $board.empty()
            $board.width(options.cols * options.cellSize);
            $board.height(options.rows * options.cellSize);

            // output square tiles
            for (var row = 0; row < options.rows; row++) {
                for (var col = 0; col < options.cols; col++) {
                    var style = (row + col) % 2 == 0 ? "square-checker" : "";
                    $board.append('<div class="square target ' + style
                        + '" row="' + row + '" col="' + col + '"></div>')
                }
            }

            // setup up each square with droppable and obstacle creation
            setupSquare()

            // output pieces
            $board.append('<div class="start piece" style="color:purple"></div>')
            setupPiece($board.find('.start'), getSquare(options.startPos))

            $board.append('<div class="goal piece" style="color:green"></div>')
            setupPiece($board.find('.goal'), getSquare(options.targetPos))

        }

        this.moveAgent = function(startPos, targetPos) {
            var source = new Position().set(startPos)
            var dest = new Position().set(targetPos)

            var $nextSquare = getSquare(dest)
             $board.find(".start").animate({
                    top:  $nextSquare.position().top,
                    left: $nextSquare.position().left
                }, {
                    duration: options.delay,
                    complete: function() {
                                getSquare(source)
                                    .addClass("visited-square")
                              }
                })
        }

        this.reset = function() {
            $board.find(".square").removeClass("visited-square")
        }
    }
})