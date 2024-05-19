var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressed = 1;
var level = 0;

$(document).on("keydown", function (event) {
  if (keyPressed == 1) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
  }
});

$(".btn").on("click", function (event) {
  if (userClickedPattern.length < level + 1) {
    var userChosenColour = event.target.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    keyPressed = 1;
    level = 0;
    gamePattern = [];
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
  }
}

function nextSequence() {
  $("#level-title").text(`Level ${level}`);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  level++;
  keyPressed++;
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  switch (name) {
    case "blue":
      var audio = new Audio("./sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("./sounds/green.mp3");
      audio.play();
      break;
    case "red":
      var audio = new Audio("./sounds/red.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("./sounds/yellow.mp3");
      audio.play();
      break;
    case "wrong":
      var audio = new Audio("./sounds/wrong.mp3");
      audio.play();
      break;
    default:
      console.log("mp3");
      break;
  }
}
