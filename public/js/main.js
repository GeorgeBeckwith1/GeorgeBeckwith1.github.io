//Run the html before the javascript put javascript at the bottom of the page.
//Add an array with the words in.
var c = document.getElementById("hangmanCanvas"); //Hangman canvas
var canvasWidth = c.width //Defines all of the variables 
var canvasHeight = c.height
var headCenterY = 30
var headRadius = 15
var legEndY = 150
var armStartX = 100
var armStartY = 75
var armHeight = 75
var gueses = ""
var notInWord = ""
var guessCount = 0 //Define variable at top only so that prosess once.
var gameWord = "" //Add for each loop for all letters in word.
var targetWord = "";
var targetWordState = "";
var letterAlreadyUsed = 0
var words = ["ability", "according", "actually", "administration", "agreement", "beautiful", "behavior", 
"between", "business", "board", "campaign", "candidate", "central", "certainly", "character", "daughter", 
"democratic", "development", "discussion", "during", "economic", "education", "environmental", "everybody", 
"experience", "family", "feeling", "fill", "financial", "foreign", "generation", "government", "growth", 
"green", "glass", "happen", "health", "heavy", "himself", "hospital", "image", "including", "information", 
"institution", "international", "job", "join", "just", "keep", "key", "kitchen", "knowledge", "know", "language", 
"lawyer", "leader", "leave", "letter", "magazine", "maintain", "management", "manager", "material", "national", 
"necessary", "newspaper", "none", "number", "official", "operation", "opportunity", "organization", "outside", 
"particularly", "pattern", "performance", "personal", "player", "quality", "question", "quickly", "quite", 
"race", "rather", "reality", "realize", "recognize", "same", "school", "scientist", "season", "seem", "talk", 
"technology", "television", "themselves", "think", "understand", "until", "upon", "usually", "under", "violence", 
"vote", "voice", "visit", "view", "wait", "walk", "want", "watch", "weapon", "yard", "year", "young", "yourself"];

var word = words[Math.floor(Math.random()*words.length)];

//Canvas Hangman
var functionsArray = [ //Array of the canvas functions.
    hangmanStandBottom,
    hangmanStandSide,
    hangmanStandTop,
    hangmanStandCorner,
    hangmanNoose,
    hangmanHead,
    hangmanBody,
    hangmanLeftLeg,
    hangmanRightLeg,
    hangmanLeftArm,
    hangmanRightArm
]

livesRemaining = (11 - guessCount) //Lives remainng.

document.getElementById("userGuess").addEventListener("keypress", function(event) { //Make the enter button submit the text field.
    if (event.keyCode == 13) {
        handleGuess()
    }
});

/*function GetRandomWord() {
    console.log('Requesting Random Word');
    var requestStr = "/word";
    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "text",
        success: randomWordReceived,
        error: function(err)  {
            console.log("Error " + err)
        randomWordReceived(word) 
        }
    });
}*/

function randomWordReceived(word) {
    console.log('Random Word Received: ' + word);
    targetWord = word;
    targetWordState = targetWord.toLowerCase().split("");
    for (var i = 0; i < targetWord.length; i++) {
        gameWord += "_"; //Replaces the word with underscores.
    };
    document.getElementById("letters-container").innerHTML = gameWord; //Use outside the for loop.
}

function handleGuess() {
    var input = document.getElementById("userGuess") //Output the users input and link to function checkGuess.
    checkGuess(input.value)
    document.getElementById('userGuess').value = ''; //Clear userGuess.
}

function checkGuess(guess) { //Check to where the users guess is in the word and out put the index to the console.
    document.getElementById("usedWord").innerHTML  = "";

    var lowercaseGuess = guess.toLowerCase();
    var guessMatches = getGuessMatches(lowercaseGuess)
    if (guessMatches.length > 0) {
        applyCorrectMatches(guessMatches, lowercaseGuess)
    } else {
        applyIncorrectMatches(lowercaseGuess)
    }
}

function applyCorrectMatches(guessMatches, guess){
    for (var i = 0; i< guessMatches.length; i++){
        var targetIndex = guessMatches[i];

        targetWordState[targetIndex] = null; //Check off letters from targetState

        gameWord = setCharAt(gameWord, targetIndex, guess)
    }
    //Set char at on game word (guessIndex) to be guess.

    document.getElementById("letters-container").innerHTML = gameWord; //Set innerHTML of letters container to be gameWord.

    renderRemainingLives();

    gueses = gueses + guess;

    if (gameWord.toLowerCase() == targetWord.toLowerCase()){
        renderGameWon()
        disableInputs()
    }
}
function letterUsed(){
    document.getElementById("usedWord").innerHTML  = "That letter has been used already!";
}

function applyIncorrectMatches(guess) {
    letterAlreadyUsed = gueses.indexOf(guess)

    if (letterAlreadyUsed > -1) {
        letterUsed()
    } else {
        guessAdd()

        gueses = gueses + guess;
        notInWord = notInWord + guess;
        document.getElementById("failedChar").innerHTML = "Used Characters: " + notInWord;

        renderRemainingLives()

        if (guessCount == 11) {
            renderGameLost()
            disableInputs()
        }
    }
}

function guessAdd(){
    functionsArray[guessCount]() //Make the guessCount increment every time that the user gets a letter wrong.
    guessCount = guessCount + 1;
}
function renderRemainingLives(){
    document.getElementById("lives-remain").innerHTML = (11 - guessCount); //When the user gets 11 attempts wrong it will end the game.
    document.getElementById("lives-used").innerHTML = guessCount;
}

function renderGameLost(){
    document.getElementById("answer").innerHTML = "The word was " + targetWord;
    document.getElementById("gameLost").innerHTML = "Game Lost!";
}

function renderGameWon(){
    document.getElementById("gameWon").innerHTML = "Game Won!";
}

function getGuessMatches(guess)
{
    var guessMatches = []
    for (var i = 0; i <targetWordState.length; i++) {
        var char = targetWordState[i]

        if (char == guess){
            guessMatches.push(i)
        }
    }
    return guessMatches
}

function setCharAt(str,index,chr) { // The index that the user has guessed is then replaced with a underscore call at setCharAt (line: 78)
    if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
}

function disableInputs() { //Makes the text box unusable after the game has been won/lost.
    if (guessCount == 11, gameWord == targetWord);
        document.getElementById("userGuess").disabled = true;
}


function hangmanStandBottom(){ //Stand Bottom
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(75, 200);
    ctx.stroke();
}

//Stand Side
function hangmanStandSide(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200, 0);
    ctx.stroke();
}

//Stand Top
function hangmanStandTop(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(200, 0);
    ctx.stroke();
}

//Stand Corner
function hangmanStandCorner(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(175, 0);
    ctx.lineTo(200, 20);
    ctx.stroke();
}

//Noose
function hangmanNoose(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, headCenterY - headRadius);
    ctx.stroke();
}

//Head
function hangmanHead(){
    var c = document.getElementById("hangmanCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(canvasWidth / 2,headCenterY,headRadius,0,2*Math.PI);
    ctx.stroke();
}

//Body
function hangmanBody(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, headCenterY + headRadius);
    ctx.lineTo(canvasWidth / 2, canvasHeight / 2);
    ctx.stroke();
}

//Left Leg
function hangmanLeftLeg(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
    ctx.lineTo(70, legEndY);
    ctx.stroke();
}

//Right Leg
function hangmanRightLeg(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
    ctx.lineTo(130, legEndY);
    ctx.stroke();
}

//Left Arm
function hangmanLeftArm(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(armStartX, armStartY);
    ctx.lineTo(70, armHeight);
    ctx.stroke();
}

//Right Arm
function hangmanRightArm(){
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(armStartX, armStartY);
    ctx.lineTo(130, armHeight);
    ctx.stroke();
}

randomWordReceived(word)