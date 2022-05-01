var new_elem = document.getElementById("new");
var previous_elem = document.getElementById("previous")
var new_img = document.getElementById("newimg")
var previous_img = document.getElementById("previmg")
const btns = document.getElementsByClassName("btn");
const result_elem = document.getElementById("result");
const score_elem = document.getElementById("score");

var previous_card;
var current_card = {
	prices : {
		usd : "1.00"
	},
	image_uris : {
		normal : "https://c1.scryfall.com/file/scryfall-cards/normal/front/9/7/9703d090-b415-48e2-8158-dd8fc57ecc50.jpg?1562926981"
	}
};
var score = 0;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		let test = JSON.parse(xhttp.responseText);
		if (test.prices.usd) {
			previous_card = current_card;
			previous_elem.innerText = current_card.prices.usd;
			previous_img.src = current_card.image_uris.normal;
			current_card = JSON.parse(xhttp.responseText);
			console.log(current_card)
			new_img.src = current_card.image_uris.normal;
		} else {
			getRandomCard();
		}
    } 
};

getRandomCard();

getRandomCard();
for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		PlayGame(this.dataset.value);
	});
}

function PlayGame (choice) {
	let comparison;
	
	if (previous_card.prices.usd < current_card.prices.usd) {
		comparison = "higher";
	} else if (previous_card.prices.usd > current_card.prices.usd) {
		comparison = "lower";
	} else {
		comparison = "match";
	}

	if (choice == comparison || comparison == "match") {
		score++;
		score_elem.innerText = score;
		result_elem.innerText = "Correct";
		result_elem.classList.add("correct");
		result_elem.classList.remove("hide");

		setTimeout(function () {
			result_elem.classList.remove("correct");
			result_elem.classList.add("hide");
		}, 750);
	} else {
		result_elem.innerText = "Incorrect";
		result_elem.classList.add("incorrect");
		result_elem.classList.remove("hide");

		score = 0;
		score_elem.innerText = score;

		setTimeout(function () {
			result_elem.classList.remove("incorrect");
			result_elem.classList.add("hide");
		}, 750);
	}
	
	getRandomCard();
}

function getRandomCard () {
    xhttp.open("GET", "https://api.scryfall.com/cards/random", true);
    xhttp.send();
}