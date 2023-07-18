var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];


var userClickedPattern = [];

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

var level = 0;
var started = false;
$(document).keypress(function(){
    if(!started)
    {
        // $("#level-title").text = "Level " + level;
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4); 
    var randomChoserColor = buttonColours[randomNumber];
    gamePattern.push(randomChoserColor);

    $("#"+ randomChoserColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChoserColor);
}
function playsound(name)
{
    var path = "sounds/"+name+".mp3";
    var audio = new Audio(path);
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("True");

        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver()
{
    gamePattern = [];
    started = false;
    level = 0;
}
