console.log("Up and running!");

var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];

var cardsInPlay = [];

//Function to check for match; nested in flipCard
var checkForMatch = function () {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert("You found a match!");
	}
	else {
		alert("Sorry, try again.");
	}	
}

//Function to execute after user flips a card
var flipCard = function () {
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank);
	cardsInPlay.push(cards[cardId].rank);
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length === 2) {
		checkForMatch();
		// createBoard();
		cardsInPlay = [];
	}
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	console.log("No. of cards in play:" + cardsInPlay.length)
}

var createBoard = function () {
	for (var i = 0; i < cards.length; i++){
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

createBoard();