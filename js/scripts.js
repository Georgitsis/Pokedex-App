//Modal
/*let pokemonModal = (function() {

//expects pokemonName, pokemonHeight, pokemonTypes,imageSourceUrl as paramters to display the modal correctly

	function showModal(pokemonName, pokemonHeight, pokemonTypes,imageSourceUrl) {
		let modalContainer = document.querySelector('#modal-container');
	 
		// Clear all existing modal content
		modalContainer.innerHTML = '';
	 
		let modal = document.createElement('div');
		modal.classList.add('modal');
	 
		// Add the new modal content
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);
		
		//picture element created and source set
		let pictureElement = document.createElement('img');
		pictureElement.src = imageSourceUrl;

		//creating the modal header, setting the displayed text and capitalizing the first letter
		let titleElement = document.createElement('h1');
		titleElement.innerText = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1); //...and capitalize first letter
		
		//creating the modal content. Displayed attributes: pokemon height and its types. pokemon types are being converted from an object array
		//to a formatted text by the function TypesToString 
		let contentElement = document.createElement('p');
		contentElement.innerText = "Height: " + pokemonHeight/10 + " m" + "\n" + " Types: " + TypesToString(pokemonTypes);
		
		//new html elements are appended to thei parent elements
		modal.appendChild(closeButtonElement);
		modal.appendChild(pictureElement);
		modal.appendChild(titleElement);
		modal.appendChild(contentElement);
		modalContainer.appendChild(modal);
		
		//adding class "is-visible" to modal container
		modalContainer.classList.add('is-visible');
  
		//if user clicks outside of modal close modal
		modalContainer.addEventListener('click', (e) => {
		  // Since this is also triggered when clicking INSIDE the modal
		  // We only want to close if the user clicks directly on the overlay
		  let target = e.target;
		  if (target === modalContainer) {
			 hideModal();
		  }
		});
	}

	//hides the modal by removing the is-visible class from modal container	
	function hideModal() {
		let modalContainer = document.querySelector('#modal-container');
		modalContainer.classList.remove('is-visible');
	}

	function TypesToString(pokemonTypes){
		let displayedString = "";

		pokemonTypes.forEach(function(types,index){
			if(index != 0)
				displayedString = displayedString.concat(", ");	
			displayedString = displayedString.concat(types.type.name);
		})
		
		return displayedString;
	}

	window.addEventListener('keydown', (e) => {
		let modalContainer = document.querySelector('#modal-container');
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
		  hideModal();  
		}
	});

	return {
		showModal : showModal,
		hideModal : hideModal
	}
})();*/

//Nesting PokemonList in a IIFE

let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

/* returns the entire pokemon list*/
function getAll() {
	  return pokemonList;
}

/* If item is a valid pokemon object it will be added to the pokemon list*/
function add(item) {
	//if(isPokemon(item))
	pokemonList.push(item);
	//else
	//	alert("Not a Pokemon");
}

/* expects a string as parameter and searches the pokemon list for an exact name match. Returns an array of objects if several matches */ 
function findPokemonByName(pokemonName){
	let results = pokemonList.filter(pokemon => pokemon.name === pokemonName);
	return results;
}

/* Expects a pokemon object as parameter. Will create a list item for the pokemon */
function addListItem(pokemon) {
	let ListElement = document.createElement('li');						//create a new list element
	let pokemonButton = document.createElement('button');				//create a new pokemon button
	pokemonButton.classList.add('pokemonButton');						//add pokemonButton class to the button
	addPokemonButtonEvent(pokemonButton,pokemon);						//adds a click event to the pokemon button
	pokemonButton.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);	//Set inner text of button to the pokemon name, capitalize first letter
	let pokemonList = document.querySelector("ul.pokemon-list");	//Select the ul element with pokemon-list class
	pokemonList.appendChild(ListElement);									//add a list item to ul.pokemon.list
	ListElement.appendChild(pokemonButton); 								//add a button to the list element
}

/*gives out an alert with pokemon name and size */
function showDetails(pokemon){
	loadDetails(pokemon).then(function(){
		/*console.log(pokemon.name);
		console.log(pokemon.height);
		console.log(pokemon.imageUrl);*/
		pokemonModal.showModal(pokemon.name,pokemon.height,pokemon.types,pokemon.imageUrl);
	})
}
//shows details (through an event listener) when pokemon button is pressed
function addPokemonButtonEvent(button, pokemon){
	button.addEventListener("click", function () {
		showDetails(pokemon);
	})
}

//fetches list from API and add pokemon to pokemonList[]
function loadList() {
	return fetch(apiUrl).then(function (response) {		//fetch(apiUrl) passes on a list of pokemon to parameter "response" . For now it is an object response (an object)
		return response.json();									//response.jason() returns a promise which passes the JSON object array as parameter(jason next line) to the next function
	}).then(function (json) {	
		json.results.forEach(function (item) {
			let pokemon = {
				name: item.name,
				detailsUrl: item.url
		 	};
			add(pokemon);
	  });
	}).catch(function (e) {
	  console.error(e);
	})
 }

//loads a pokemon's details by using the url saved in the pokemon object 
function loadDetails(item) {
	let url = item.detailsUrl;
	return fetch(url).then(function (response) {
	  return response.json();
	}).then(function (details) {
	  // Now we add the details to the item
	  item.imageUrl = details.sprites.front_default;
	  item.height = details.height;
	  item.types = details.types;
	}).catch(function (e) {
	  console.error(e);
	});
 }

	return {
	  	add : add,
	  	getAll : getAll,
	  	findPokemonByName : findPokemonByName,
	  	addListItem : addListItem,
	  	showDetails : showDetails,
	  	addPokemonButtonEvent : addPokemonButtonEvent,
	  	loadList : loadList,
		loadDetails : loadDetails
	};
})();
  



/**********************************************************************Function declarations*******************************************/

// isPokemon() : Will return true if item is a "pokemon" by checking that it is an object, checking that it has the correct object keys and checking that the data stored in the object keys has the correct type.
// Otherwise it will return false.

function isPokemon(item){
	let correctObjectKeys = ["name","detailsUrl"];
	let correctObjectKeysTypes = ["string","string"]
	if(typeof item !== "object")
		return false;
	else if (Object.keys(item).toString()!=="name,url")
		return false;
	Object.keys(item).forEach(function (objectKey,index) {
		if(objectKey !== correctObjectKeys[index])
			return false;
		else if (typeof item[objectKey]!==correctObjectKeysTypes[index])
			return false;
	})
	return true;
}


function writePokemonsOnDocument(listOfPokemon){
	listOfPokemon.forEach(function(singlePokemon){
		document.write(`${singlePokemon.name} is ${singlePokemon.height} m tall<br>`);
	})
}
/************************************************************************************************************************************/

/*pokemonRepository.add({ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']});
pokemonRepository.add({  name: 'Pikachu', height: 0.4, types: ['electric']});
pokemonRepository.add({ name: 'Weedle', height: 0.3, types: ['bug', 'poison']});
pokemonRepository.add({ name: 'Onix', height: 8.8, types: ['rock', 'ground']});
pokemonRepository.add({ name: 'Drapion', height: 1.3, types: ['poison','dark']});
pokemonRepository.add({ name: 'Weedle', height: 0.3, types: ['bug', 'poison']});
//pokemonRepository.add({ engine:"electric", wheels : 4});												//object to test the isPokemon function*/

pokemonRepository.loadList().then(function(){
	pokemonRepository.getAll().forEach(function(pokemon){
		pokemonRepository.addListItem(pokemon);
	})
})

