var gamePattern = []
var userPattern = []
var buttonArray= ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length-1);
});

function nextSequence(){

    level++;
    userPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonArray[randomNumber];
    gamePattern.push(randomColor); 
    $( "#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

} 

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


$(document).keydown(function(){
    if(start === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]){

    if(userPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
}else{
    var audio = new Audio("sounds/wrong.mp3")
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
   $("#level-title").text("Game Over!, Press Any Key to Restart")
   $(document).keydown(function(){
        startOver();
   });
}
}

function startOver(){
    gamePattern = [];
    level = 0;
    // start = false;
    nextSequence();
}