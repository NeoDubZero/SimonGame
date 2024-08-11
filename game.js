var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var levelReady = false;

$(document).on("keydown", function() {
    if(!gameStarted){
        gameStarted = true;
        nextSequence();
    }
});

$(".btn").on("click", function() {
    if(levelReady){
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress($(this));

        checkAnswer(userClickedPattern.length - 1);
    }
})

function nextSequence() 
{
    //level++;
    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColors[randomNumber]);

    $("h1").text("Level " + (++level));
    $("#" + buttonColors[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColors[randomNumber])
    levelReady = true;
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) 
{
    currentColor.addClass("pressed");
    setTimeout(function(){
        currentColor.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) 
{
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("Success!");
        if(userClickedPattern.length == gamePattern.length){
            levelReady = false;
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
        console.log("Wrong 😢");
    }
}

function startOver() 
{
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}