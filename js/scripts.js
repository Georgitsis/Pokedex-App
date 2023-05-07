//Nesting PokemonList in a IIEF

let pokemonRepository = (function () {
	let pokemonList = [];

function getAll() {
	  return pokemonList;
}

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
	pokemonButton.innerText = pokemon.name;								//Set inner text of button to the pokemon name
	let pokemonList = document.querySelector("ul.pokemon-list");	//Select the ul element with pokemon-list class
	pokemonList.appendChild(ListElement);									//add a list item to ul.pokemon.list
	ListElement.appendChild(pokemonButton); 								//add a button the list element
}

	return {
	  add : add,
	  getAll : getAll,
	  findPokemonByName : findPokemonByName,
	  addListItem : addListItem 
	};
})();
  
/**********************************************************************Function declarations*******************************************/

// isPokemon() : Will return true if item is a "pokemon" by checking that it is an object, checking that it has the correct object keys and checking that the data stored in the object keys has the correct type.
// Otherwise it will return false.

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
}

function writePokemonsOnDocument(listOfPokemon){
	listOfPokemon.forEach(function(singlePokemon){
		document.write(`${singlePokemon.name} is ${singlePokemon.height} m tall<br>`);
	})
}
/************************************************************************************************************************************/

pokemonRepository.add({ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']});
pokemonRepository.add({  name: 'Pikachu', height: 0.4, types: ['electric']});
pokemonRepository.add({ name: 'Weedle', height: 0.3, types: ['bug', 'poison']});
pokemonRepository.add({ name: 'Onix', height: 8.8, types: ['rock', 'ground']});
pokemonRepository.add({ name: 'Drapion', height: 1.3, types: ['poison','dark']});
pokemonRepository.add({ name: 'Weedle', height: 0.3, types: ['bug', 'poison']});
//pokemonRepository.add({ engine:"electric", wheels : 4});												//object to test the isPokemon function


pokemonRepository.getAll().forEach(function(pokemon){
	pokemonRepository.addListItem(pokemon);	
})