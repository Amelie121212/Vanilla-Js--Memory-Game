// cards array holds all cards
var card = document.getElementsByClassName("card");
var cards = [...card];
// deck of all cards in game
const deck = document.getElementById("card-deck");
// declaring variable of matchedCards
var matchedCard = document.getElementsByClassName("match");
 // close icon in modal2
var closeicon = document.querySelector(".close");
 // declare modal2
var modal2 = document.getElementById("popup2");
 // declare modal1
var modal1 = document.getElementById("popup1");
// start buttom
var startButton = document.getElementById("start");
var song = document.getElementById("song");
 // array for opened cards
var openedCards = [];
// declaring move variable
let moves = 0;
// returns shuffled array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
// shuffles cards when page is refreshed or loads
// start a new play 
function startGame(){
    // remove disable from dick
    deck.classList.remove("disabled");
    // empty the openCards array
    openedCards = [];
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    // reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    clearInterval(interval);
}
// toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};
// add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};
// when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}
// when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open","unmatched");
        openedCards[1].classList.remove("show", "open","unmatched");
        enable();
        openedCards = [];
    },1100);
}
// disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}
// enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}
// count player's moves
function moveCounter(){
    moves++;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
}
// game timer
var second = 0, minute = 0; hour = 0;
var interval;
function startTimer(){
    interval = setInterval(function(){
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
// congratulations when all cards match, show modal2 and moves and time
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = minute+" mins "+second+" secs";
        // show congratulations modal2
        modal2.classList.remove("hide");
        //showing moves and time
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = finalTime;
    };
}
// play Again 
function playAgain(){
    modal2.classList.add("hide");
    startGame();
}
// get ready
function getReady(){
    song.play();
    startButton.classList.add("hide");
    var i=0;
    var start = ["3", "2", "1", "Go"];
    var startS=document.getElementById("countdown");
    startS.innerHTML="Get Ready";
    var myVar = setInterval(changePara, 1000);  
    function changePara() {
        if (i>3) {    
        clearInterval(myVar);
        modal1.classList.add("hide");
        startGame();
        }
        startS.innerHTML= start[i]; i++;  
    };
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
