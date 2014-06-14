require.config({
    baseUrl: 'scripts',
    paths: {
        'jquery': 'lib/jquery',
        'jquery-ui': 'lib/jquery-ui'
    }
});


require(['jquery', 'jquery-ui', 'game'], function($, jqueryUi, Game) {
    $(document).ready(function(){

        var game1 = new Game({
            target: "#board1",
            rows: 12, cols: 12, cellSize: 40,
            startPos: {row:0, col:0},
            targetPos:  {row:11, col:11},
            delay: 120
        })

        game1.start()

        $("#findPathBtn1").click(function(){
            game1.solve()
        })

        var game2 = new Game({
            target: "#board2",
            rows: 12, cols: 16, cellSize: 40,
            startPos: {row:0, col:0},
            targetPos:  {row:6, col:8},
            delay: 120
        })

        game2.start()

        $("#findPathBtn2").click(function(){
            game2.solve()
        })
    })
})