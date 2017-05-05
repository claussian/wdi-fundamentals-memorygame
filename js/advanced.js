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

// Total flips counter
var totalFlipCount = 15;

//Function to display no. of tries left in alert board
var tryCounterDisplay = function (totalFlipCount) {
	var tryCounter = document.createElement('p');
	tryCounter.textContent = "No. of tries left: " + totalFlipCount;
	return tryCounter;
}

// Function to change message on alert board
var messageDisplay = function (alertBoard, elementType, content) {
	var children = alertBoard.childNodes;
	while (children.length > 0) {
		alertBoard.removeChild(children[0]); // remove all existing nodes first
	}
	var message = document.createElement(elementType);
	message.textContent = content;
	return message;
}

// Flip back all cards if card pair in play do not match
var hideBoard = function () {
	var children = document.getElementsByTagName('img');
	for (var i = 0; i < children.length; i++) {
		children[i].setAttribute('src', "images/back.png");
		children[i].setAttribute('face', 0);
	}
}

// Neutral alert board
var alertNeutral = function (totalFlipCount) {
	var alertBoard = document.getElementById('alert-board');
	alertBoard.style.backgroundColor = "#6E7B8B";
	var messageNeutral = messageDisplay(alertBoard, 'h1', "Flip a card");
	alertBoard.appendChild(messageNeutral);
	var tryCounter = tryCounterDisplay(totalFlipCount);
	alertBoard.appendChild(tryCounter);
	// alertBoard.innerHTML = "<h1>Flip a card</h1>";
}

// Reset board
var resetBoard = function () {
	var children = document.getElementsByTagName('img');
	while (children.length > 0) {
		document.getElementById('game-board').removeChild(children[0]);
	}
	var currentDeck = createBoard();
	console.log("Current deck:" + currentDeck);
	totalFlipCount = 15;
	alertNeutral(totalFlipCount);
	wins = 0;
	
}

// Function to check for match; nested in flipCard
var checkForMatch = function (totalFlipCount) {
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
			var messageWin = messageDisplay(alertBoard, 'h1', "You've won! Reset?");
			alertBoard.appendChild(messageWin);
			// alertBoard.innerHTML = "<h1>You've won! Reset?</h1>";
			var tryCounter = tryCounterDisplay(totalFlipCount);
			alertBoard.appendChild(tryCounter);
			alertBoard.addEventListener('click', resetBoard);
		}
		else {
			alertBoard.style.backgroundColor = "#F15B31";
			var messageMatch = messageDisplay(alertBoard, 'h1', "Match!");
			alertBoard.appendChild(messageMatch);
			// alertBoard.innerHTML = "<h1>Match!</h1>";
			var tryCounter = tryCounterDisplay(totalFlipCount);
			alertBoard.appendChild(tryCounter);
		}
		console.log("Score:" + wins)
	}
	else {
		// alert("Sorry, try again.");
		alertBoard.style.backgroundColor = "#00A6B3";
		var messageSorry = messageDisplay(alertBoard, 'h1', "Sorry, try again");
		alertBoard.appendChild(messageSorry);
		// alertBoard.innerHTML = "<h1>Sorry, try again</h1>";
		var tryCounter = tryCounterDisplay(totalFlipCount);
		alertBoard.appendChild(tryCounter);
		hideBoard();
		wins = 0;
		console.log("Score:" + wins)
	}	
}

// Function to execute after user flips a card
var flipCard = function () {
	totalFlipCount -= 1;
	if (totalFlipCount > 0){
		var cardId = this.getAttribute('data-id');
		console.log("User flipped " + cardId + ": " + cards[cardId].rank);
		this.setAttribute('src', cards[cardId].cardImage);
		var flipCount = Number(this.getAttribute('face')) + 1; // track whether card has been flipped before
		this.setAttribute('face',  flipCount);
		console.log("Flipcount on current card: " + flipCount);
		cardsInPlay.push({
			rank: cards[cardId].rank,
			id: cardId,
			face: flipCount
		});
		// console.log("Cards in play:" + cardsInPlay.length)
		// Ensure that a different card is clicked to score a match & at least one of the cards is new
		if (cardsInPlay.length === 2 && cardsInPlay[0].id != cardsInPlay[1].id && Math.min(cardsInPlay[0].face, cardsInPlay[1].face) === 1) {
			checkForMatch(totalFlipCount);
			console.log("Cards in play: " + cardsInPlay[0].rank + ", " + cardsInPlay[1].rank)
			cardsInPlay = [];
		}
		else if (cardsInPlay.length === 1) {
			alertNeutral(totalFlipCount);
			console.log("Cards in play: " + cardsInPlay[0].rank)
		}
		else {
			var checkPlayedCard = currentDeck.indexOf(Number(cardsInPlay[1].id)) // check if most recent card is unplayed, if same card retain the later one
			if (checkPlayedCard > -1) { 
				cardsInPlay.shift(); // retain the unplayed card
				console.log("Cards in play: " + cardsInPlay[0].rank);
			}
			else {
				checkPlayedCard = currentDeck.indexOf(Number(cardsInPlay[0].id))
				if (checkPlayedCard > -1) { 
					cardsInPlay.pop(); // retain the unplayed card
					console.log("Cards in play: " + cardsInPlay[0].rank);
				}
				else {
					cardsInPlay = [];
					console.log("Cards in play: " + cardsInPlay);
				}
			}
			alertNeutral(totalFlipCount);
			// console.log("Flipcount on current card: " + cardsInPlay[0].face)
			// console.log(cards[cardId].cardImage);
			// console.log(cards[cardId].suit);
		}
	}
	else {
		var alertBoard = document.getElementById('alert-board');
		alertBoard.style.backgroundColor = "#000000";
		var messageOutOfLuck = messageDisplay(alertBoard, 'h1', "You've run out of tries! Reset?");
		alertBoard.appendChild(messageOutOfLuck);
		// alertBoard.innerHTML = "<h1>You've run out of tries! Reset?</h1>";
		var tryCounter = tryCounterDisplay(totalFlipCount);
		alertBoard.appendChild(tryCounter);
		alertBoard.addEventListener('click', resetBoard);
	}
	
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
	var shuffledDeck = getShuffledDeck(true);
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