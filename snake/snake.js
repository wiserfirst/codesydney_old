jQuery(function(){
    var INTERVAL = 300;
    var GRID_SIZE = 40;
    var getRow = function() {
        var row = [];
        for (var i = 0; i < GRID_SIZE; i++) {
            row.push("&nbsp;");
        }
        return row;
    };
    var getGrids = function() {
        var grids = [];
        for (var i = 0; i < GRID_SIZE; i++) {
            grids.push(getRow());
        }
        return grids;
    };

    var snake = {
        direction: "r",
        body: [[20,20], [19,20], [18,20]],
        food: [],
        move: function() {
            var headNode = this.body[0];
            var newHead = [headNode[0], headNode[1]];
            switch(this.direction) {
                case "l": // x-1, y
                    newHead[0] -= 1;
                    break;
                case "u": // x, y-1
                    newHead[1] -= 1;
                    break;
                case "r": // x+1, y
                    newHead[0] += 1;
                    break;
                case "d": // x, y+1
                    newHead[1] += 1;
                    break;
                default:
                    console.log("Unknown direction" + this.direction);
                    break;
            }
            if (newHead[0] < 0 || newHead[0] >= GRID_SIZE
                || newHead[1] < 0 || newHead[1] >= GRID_SIZE
                || this.exist(newHead)) {
                alert("GAME OVER!");
                location.reload();
            }
            if (!this.eatFood(newHead)) {
                this.body.pop();
            }
            this.body.unshift(newHead);
        },
        exist: function(newHead) {
            for (var i in this.body) {
                var node = this.body[i];
                if (node[0] === newHead[0] && node[1] === newHead[1]) {
                    return true;
                }
            }
            return false;
        },
        getFood: function() {
            do {
                this.food = [];
                this.food.push(Math.floor((Math.random() * GRID_SIZE)));
                this.food.push(Math.floor((Math.random() * GRID_SIZE)));
            }while (this.exist(this.food));
        },
        eatFood: function(newHead) {
            if (this.food[0] === newHead[0] && this.food[1] === newHead[1]) {
                this.incScore();
                this.getFood();
                return true;
            }
            return false;
        },
        score: 0,
        incScore: function() {
            this.score++;
            console.log("Score: " + this.score);
        }
    };

    var drawSnake = function(container) {
        var grids = getGrids();
        var snakeBody = snake.body;
        if (snake.food.length === 0) {
            snake.getFood();
        }
        grids[snake.food[1]][snake.food[0]] = "X";
        for (var i in snakeBody) {
            var x = snakeBody[i][0];
            var y = snakeBody[i][1];
            grids[y][x] = "O";
        }
        for (var i = 0; i < GRID_SIZE; i++) {
            var rowElement = $('<div class="row">');
            for (var j = 0; j < GRID_SIZE; j++) {
                rowElement.append('<div class="cell">' + grids[i][j] + '</div>');
            }
            container.append(rowElement);
        }
    };
    var clearSnake = function(container) {
        container.empty();
    };

    var container = $("#content");

    // Key code definition
    var KEY_LEFT = 37;
    var KEY_UP = 38;
    var KEY_RIGHT = 39;
    var KEY_DOWN = 40;
    var directionMap = {
        37: "l",
        38: "u",
        39: "r",
        40: "d"
    };

    // Change direction
    $("body").keydown(function(event) {
        //event.preventDefault();
        var keyCode = event.which;
        if (keyCode === KEY_LEFT || keyCode === KEY_UP
            || keyCode === KEY_RIGHT || keyCode === KEY_DOWN) {
            snake.direction = directionMap[keyCode];
            //console.log("new direction: " + snake.direction);
        }
    });

    // perform a turn
    var move = function() {
        clearSnake(container);
        snake.move();
        drawSnake(container);

        setTimeout(move, INTERVAL);
    };


    move();
});
