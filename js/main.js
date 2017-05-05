console.log("Up and running!");

var cards = [
	{
		rank: "queen-of-hearts",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen-of-diamonds",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king-of-hearts",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king-of-diamonds",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	},
	{
		rank: "queen-of-hearts",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen-of-diamonds",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king-of-hearts",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king-of-diamonds",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

var cardsInPlay = [];

// Wins counter
var wins = 0;

// Flip back all cards if card pair in play do not match
var hideBoard = function () {
	var children = document.getElementsByTagName('img');
	for (var i = 0; i < children.length; i++) {
		children[i].setAttribute('src', "images/back.png");
		children[i].setAttribute('face', 0);
	}
}

// Neutral alert board
var alertNeutral = function () {
	var alertBoard = document.getElementById('alert-board');
	alertBoard.style.backgroundColor = "#6E7B8B";
	alertBoard.innerHTML = "<h1>Flip a card</h1>";
}

// Reset board
var resetBoard = function () {
	var children = document.getElementsByTagName('img');
	while (children.length > 0) {
		document.getElementById('game-board').removeChild(children[0])
	}
	var currentDeck = createBoard();
	console.log("Current deck:" + currentDeck);
	alertNeutral();
	wins = 0;
}

// Function to check for match; nested in flipCard
var checkForMatch = function () {
	var alertBoard = document.getElementById('alert-board');
	if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
		// alert("You found a match!");
		wins += 1;
		for (var i = 0; i < cardsInPlay.length; i++){
			var playedCard = currentDeck.indexOf(Number(cardsInPlay[i].id));
			currentDeck.splice(playedCard, 1); // remove matched cards from current deck
		}
		if (wins === 4) {
			alertBoard.style.backgroundColor = "#9A0000";
			alertBoard.innerHTML = "<h1>You've won! Reset?</h1>";
			alertBoard.addEventListener('click', resetBoard);
			// document.getElementById('game-board').addEventListener('click', resetBoard);
		}
		else {
			alertBoard.style.backgroundColor = "#F15B31";
			alertBoard.innerHTML = "<h1>Match!</h1>";
		}
		console.log("Score:" + wins)
	}
	else {
		// alert("Sorry, try again.");
		alertBoard.style.backgroundColor = "#00A6B3";
		alertBoard.innerHTML = "<h1>Sorry, try again</h1>";
		setTimeout(hideBoard, 500);
		wins = 0;
		console.log("Score:" + wins)
	}	
}

// Function to execute after user flips a card
var flipCard = function () {
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cardId + ": " + cards[cardId].rank);
	this.setAttribute('src', cards[cardId].cardImage);
	var flipCount = Number(this.getAttribute('face')) + 1; // track whether card has been flipped before
	this.setAttribute('face',  flipCount);
	// console.log("Flipcount on current card: " + flipCount);
	cardsInPlay.push({
		rank: cards[cardId].rank,
		id: cardId,
		face: flipCount
	});
	// Ensure that the same card cannot be clicked to score a match & at least one of the cards in a pair must be new
	if (cardsInPlay.length === 2 && cardsInPlay[0].id != cardsInPlay[1].id && Math.min(cardsInPlay[0].face, cardsInPlay[1].face) === 1) {
		checkForMatch();
		console.log("Cards in play: " + cardsInPlay[0].rank + ", " + cardsInPlay[1].rank)
		cardsInPlay = [];
	}
	else if (cardsInPlay.length === 1) {
		alertNeutral();
		console.log("Cards in play: " + cardsInPlay[0].rank)
	}
	else {
		var checkPlayedCard = currentDeck.indexOf(Number(cardsInPlay[1].id)) // check if most recent card is unplayed, if same card retain the later one
		if (checkPlayedCard > -1) { 
			cardsInPlay.shift(); // retain the unplayed card
			console.log("Cards in play: " + cardsInPlay[0].rank);
		}
		else {
			checkPlayedCard = currentDeck.indexOf(Number(cardsInPlay[1].id))
			if (checkPlayedCard > -1) { 
				cardsInPlay.pop(); // retain the unplayed card
				console.log("Cards in play: " + cardsInPlay[0].rank);
			}
			else {
				cardsInPlay = [];
				console.log("Cards in play: " + cardsInPlay);
			}
		}
		alertNeutral();
	}
	// console.log(cards[cardId].cardImage);
	// console.log(cards[cardId].suit);
}

// Shuffle from deck
var getShuffledDeck = function (test) {
	var indexArray = [];
	for (var i = 0; i < cards.length; i++) {
		indexArray.push(i);
	}
	if (test === true) {
		shuffledDeck = indexArray;
	}
	else {
		var shuffledDeck = [];
		for (i = 0; i < cards.length; i++) {
			// Sample index from ever-shortening indexArray
			var randomIndex = Math.floor(Math.random() * indexArray.length);
			// Push out the card with that index
			var randomCard = indexArray.splice(randomIndex, 1)[0];
			shuffledDeck.push(randomCard);
		}
	}
	return shuffledDeck;
}


var createBoard = function () {
	var shuffledDeck = getShuffledDeck(false);
	for (var i = 0; i < cards.length; i++){
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', shuffledDeck[i]);
		cardElement.setAttribute('face', 0);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
	return shuffledDeck;
}

var currentDeck = createBoard();
console.log("Current deck:" + currentDeck);