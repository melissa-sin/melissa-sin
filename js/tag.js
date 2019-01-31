const form = document.getElementById('query-form');

const query = document.getElementById('query');

const list = document.getElementById('list-data');

//mySetupCodes
//fetching buttons from html and pulling into javascript
const guessOne = document.getElementById('word-one')
const guessTwo = document.getElementById('word-two')
const guessThree = document.getElementById('word-three')
const guessFour = document.getElementById('word-four')

//what i need to do:
//need function that generats 4 numbers/4words in the array
//that does not repeat itself
//then gives 4 values seperately that can be recorded

// Basic 12 choices player gets to choose from with console log to check state before shuffle
const randomWordGenerator = [ "landscape", "party", "love", "fishing", "design", "kittens", "cakes", "jellyfish", "seahorse", "jewellery", "food", "puppies"];
console.log (randomWordGenerator);
//Shuffling of array of words and checking if its properly suffled with console log

randomWordGenerator.sort(function() { return 0.5 - Math.random()});
console.log (randomWordGenerator);

//Taking the first 4 words from shuffled array as the final 4 choices
let randomItemOne = randomWordGenerator[0];
let randomItemTwo = randomWordGenerator[1];
let randomItemThree = randomWordGenerator[2];
let randomItemFour = randomWordGenerator[3];

//assignment words into the button
guessOne.innerHTML = randomItemOne
guessTwo.innerHTML = randomItemTwo
guessThree.innerHTML = randomItemThree
guessFour.innerHTML = randomItemFour

//Putting the 4 shuffled words created into a new array for player choice
const playerChoice = [randomItemOne, randomItemTwo, randomItemThree, randomItemFour];
//Pull 1 answer from the 4 shuffled words
let rightAnswer = playerChoice[Math.floor(Math.random()*playerChoice.length)];
//onclick function

//Hiding the form submission that is not needed
// form.onsubmit = function(event){
// 	event.preventDefault();

// 	const queryTerm = query.value;
// 	console.log(queryTerm);
// 	getTaggedPhotos(queryTerm);
// }	

function getTaggedPhotos(tagName){
	fetch('https://api.tumblr.com/v2/tagged?tag= ' + rightAnswer + '&api_key=EnDH1EHdDirDZN7cYAhjvlKGeaHnfTQLZu2FX8ASMhfZw3SuSO')
	  .then(function(response){
	     return response.json(); // convert the raw response into a JSON
	  })
	  .then(function(result){
	     console.log(result);  // console log the JSON so we can view it

	     list.innerHTML = '';
	     const items = result.response;

	     for(let i = 0; i < items.length; i++){
	     	const item = items[i];

	     	if(item.photos != undefined){
	     		const imgSrc = item.photos[0].original_size.url;

	     		const img = document.createElement('img');
	     		img.src = imgSrc;

	     		const li = document.createElement('li');
	     		li.appendChild (img);
	     		list.appendChild(li);
	     	}
	     }
	  })
}
/* For photos autogenerate */
getTaggedPhotos(rightAnswer);



//Clicking to correct answer
//added location reload upon getting right answer for reset. not the best but it works
const playerSelection = document.getElementById('selection');

playerSelection.onclick = function(event){
	const selection = event.target;
	console.log(selection)

	if (selection.innerHTML == rightAnswer){
		alert ('You are correct!');
		//Cheater code that reloads page automatically so as to reshuffle words if have time, do a proper validation
		location.reload();
	}
	if (selection.innerHTML != rightAnswer){
		alert ('You are wrong!');
	}
}
