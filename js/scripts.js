//Nesting PokemonList in a IIEF

let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

/* returns the entire pokemon list*/
function getAll() {
	  return pokemonList;
}

/* If item is a valid pokemon object it will be added to the pokemon list*/
function add(item) {
	if(isPokemon(item))
		pokemonList.push(item);
	else
		alert("Not a Pokemon");
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
	pokemonButton.innerText = pokemon.name;								//Set inner text of button to the pokemon name
	let pokemonList = document.querySelector("ul.pokemon-list");	//Select the ul element with pokemon-list class
	pokemonList.appendChild(ListElement);									//add a list item to ul.pokemon.list
	ListElement.appendChild(pokemonButton); 								//add a button to the list element
}

/*gives out an alert with pokemon name and size */
function showDetails(pokemon){
	alert(`${pokemon.name} is ${pokemon.height} m tall`);
}

function addPokemonButtonEvent(button, pokemon){
	button.addEventListener("click", function () {
		showDetails(pokemon);
	})
}

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

/* old isPokemon function

function isPokemon(item){
	let correctObjectKeys = ["name","height","types"];
	let correctObjectKeysTypes = ["string","number","object"]
	if(typeof item !== "object")
		return false;
	else if (Object.keys(item).toString()!=="name,height,types")
		return false;
	Object.keys(item).forEach(function (objectKey,index) {
		if(objectKey !== correctObjectKeys[index])
			return false;
		else if (item[objectKey]!==correctObjectKeysTypes[index])
			return false;
	})
	return true;
}*/

function isPokemon(item){
	let correctObjectKeys = ["name","url"];
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


pokemonRepository.getAll().forEach(function(pokemon){
	pokemonRepository.addListItem(pokemon);	
})