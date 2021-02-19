//4 fruits

var playing = false;
var score, trialsLeft, step, action;
var fruits = [
    "apple",
    "banana",
    "cherries",
    "grapes",
    "mango",
    "orange",
    "peach",
    "pear",
    "watermelon",
];

$(function() {
    //click on start reset button
    $("#startreset").click(function() {
        //are we playing
        if (playing == true) {
            //reload page
            location.reload();
        } else {
            //show trials left
            //heats
            //change button text to reset
            playing = true;
            score = 0;
            $("#scorevalue").html(score);
            $("#trialsLeft").show();
            trialsLeft = 3;

            addHearts();

            $("#gameOver").hide();

            $("#startreset").html("Reset Game");
        }

        //start sending fruits
        startAction();
    });
});

function addHearts() {
    $("#trialsLeft").empty();

    for (i = 0; i < trialsLeft; i++) {
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

function startAction() {
    //1.create random fruits
    //2.random step
    //3..move fruits down one by one

    $("#fruit1").show();

    chooseFruit(); //choose rand fruits

    //random position
    $("#fruit1").css({
        left: Math.round(550 * Math.random()),
        top: -50,
    });

    //generate a random step
    step = 1 + Math.round(10 * Math.random());

    //move fruit down

    action = setInterval(function() {
        $("#fruit1").css("top", $("#fruit1").position().top + step);

        //check fruit too low?
        //no->repeat nbs3

        if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
            //yes->any trials-left
            //yes:repeat
            //no->gameover n button->start
            if (trialsLeft > 1) {
                $("#fruit1").show();

                chooseFruit(); //choose rand fruits

                //random position
                $("#fruit1").css({
                    left: Math.round(550 * Math.random()),
                    top: -50,
                });

                //generate a random step
                step = 1 + Math.round(7 * Math.random());

                //reduce trails

                trialsLeft--;

                addHearts();
            } else {
                //gameover
                playing = false;

                //change to start
                $("startreset").html("Start Game");

                $("#gameOver").show();
                $("#gameOver").html(
                    "<p>Game Over!</p><p>Your score is " + score + "</p>"
                );

                $("#trialsLeft").hide();

                stopAction();
            }
        }
    }, 10);
}

//stop dropping fruits

function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
}

function chooseFruit() {
    $("#fruit1").attr(
        "src",
        "images/" + fruits[Math.round(8 * Math.random())] + ".png"
    );
}

//slice a fruit
//sound
//explode fruit

$("#fruit1").mouseover(function() {
    score++;

    $("#scorevalue").html(score);

    $("#slicesound")[0].play();

    //stop fruit
    clearInterval(action);

    //slice
    $("#fruit1").hide("explode", 400);

    //send new fruit

    setTimeout(startAction, 600);
});