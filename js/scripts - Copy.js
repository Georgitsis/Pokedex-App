//Nesting PokemonList in a IIFE
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1273";	//url of the pokemon API

// returns the entire pokemon list
function getAll() {
	  return pokemonList;
}

// If item is a valid pokemon object it will be added to the pokemon list
function add(item) {
	if(isPokemon(item))
		pokemonList.push(item);
	else
		console.log("One of the items was not a pokemon!");
}

// Expects a pokemon object as parameter. Will create a list item for the pokemon
function addListItem(pokemon) {

	fetch(pokemon.detailsUrl).then(function (response) {		//fetch(apiUrl) passes on a list of pokemon to parameter "response" . For now it is an object response (an object)
		return response.json();											//response.jason() returns a promise which passes the JSON object array as parameter(jason next line) to the next function
	}).then(function (json){
		pokemon.ButtonImgUrl = json.sprites.front_default;
	

	let ListElement = document.createElement('li');						//create a new list element

	ListElement.classList.add('pokemon-list-item',						//Adding necessary classes to the list element
	'col-12','col-sm-6','col-md-4','col-lg-3','list-group-item');

	let pokemonButton = document.createElement('button');				//create a new pokemon button
	
	pokemonButton.classList.add('btn-block','pokemon-button');		//add pokemonButton classes 
	
	pokemonButton.setAttribute("data-toggle","modal");					//set data-toggle attribute to modal
	
	pokemonButton.setAttribute("data-target","#pokemonModal");		//set data-target attribute to pokemonModal
	
	addPokemonButtonEvent(pokemonButton,pokemon);						//adds a click event to the pokemon button

	let pokemonButtonImg = document.createElement("img");

	pokemonButtonImg.setAttribute("src",pokemon.ButtonImgUrl);
	
	pokemonButtonImg.classList.add("pokemon-button-img","float-left");

	pokemonButton.appendChild(pokemonButtonImg);
	
	let pokemonButtonText = document.createElement("span");
	pokemonButtonText.innerText = pokemon.name.charAt(0).toUpperCase()	//Set inner text of button to the pokemon name, capitalize first letter
	+ pokemon.name.slice(1);

	pokemonButtonText.classList.add("pokemon-button-text");
	
	pokemonButton.appendChild(pokemonButtonText);
	
	let pokemonList = document.querySelector("ul.pokemon-list");	//Select the ul element with pokemon-list class
	
	pokemonList.appendChild(ListElement);									//add a list item to ul.pokemon.list
	
	ListElement.appendChild(pokemonButton); 								//add a button to the list element
	})
}

//Sets the values that will be displayed in the modal
function showDetails(pokemon){
	loadDetails(pokemon).then(function(){

		//naming modal elements for convenience
		let modalHeader = document.querySelector(".modal-title");
		let modalHeight = document.querySelector(".modal-height");
		let modalWeight = document.querySelector(".modal-weight");
		let modalTypes = document.querySelector(".modal-types");
		let modalAbilities = document.querySelector(".modal-abilities");
		let modalImg =  document.querySelector(".modal-image");

		//Setting src attribute
		modalImg.setAttribute("src",pokemon.imageUrl);							
				
		//setting value for modal header
		modalHeader.innerText = pokemon.name.charAt(0).toUpperCase() 		//Capitalizing 1st letter
		+ pokemon.name.slice(1);

		//Setting displayed height value 
		modalHeight.innerText = pokemon.height/10 + " m";

		//Setting displayed weight value
		modalWeight.innerText = pokemon.weight/10 + " kg";
				
		//Setting displayed types 
		let DisplayedPokemonTypes = "";	
		pokemon.types.forEach(function(types,index){
			if(index != 0)
			DisplayedPokemonTypes = DisplayedPokemonTypes + ", ";				//set comma in front of 2nd,3rd,etc type  
			DisplayedPokemonTypes = DisplayedPokemonTypes + types.type.name;//concat the new type
		})
		
		modalTypes.innerText = DisplayedPokemonTypes;

		//Setting displayed abilities
		let displayedPokemonAbilities = "";	
		pokemon.abilities.forEach(function(abilities,index){
			if(index != 0)
			displayedPokemonAbilities = displayedPokemonAbilities + ", ";				//set comma in front of 2nd,3rd,etc ability
			displayedPokemonAbilities = displayedPokemonAbilities + abilities.ability.name;			//concat the new type
		})

		modalAbilities.innerText = displayedPokemonAbilities;


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

//loads a pokemon details by using the url saved in the pokemon object

function loadDetails(item) {
	let url = item.detailsUrl;
	return fetch(url).then(function (response) {
	  return response.json();
	}).then(function (details) {
	  // Now we add the details to the item
	  item.imageUrl = details.sprites.other.dream_world.front_default; //replace with bigger better picture
	  item.height = details.height;
	  item.weight = details.weight;
	  item.types = details.types;
	  item.abilities = details.abilities;
	}).catch(function (e) {
	  console.error(e);
	});
 }

	return {
	  	add : add,
	  	getAll : getAll,
	  	addListItem : addListItem,
	  	showDetails : showDetails,
	  	addPokemonButtonEvent : addPokemonButtonEvent,
	  	loadList : loadList,
		loadDetails : loadDetails
	};
})();

/**********************************************************************Function declarations*******************************************/

// isPokemon() : Will return true if item is a "pokemon" by checking that it is an object,
// checking that it has the correct object keys and checking that the data stored in the object
// keys has the correct type. Otherwise it will return false.

function isPokemon(item){
	let correctObjectKeys = ["name","detailsUrl"];
	let correctObjectKeysTypes = ["string","string"];
	if(typeof item !== "object")
		return false;
	else if (Object.keys(item).toString()!=="name,detailsUrl")
		return false;
	Object.keys(item).forEach(function (objectKey,index) {
		if(objectKey !== correctObjectKeys[index])
			return false;
		else if (typeof item[objectKey]!==correctObjectKeysTypes[index])
			return false;
	})
	return true;
}

/************************************************************************************************************************************/

pokemonRepository.loadList().then(function(){
	pokemonRepository.getAll().forEach(function(pokemon){
		pokemonRepository.addListItem(pokemon);
	})
})

