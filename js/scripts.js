//Nesting PokemonList in a IIFE
let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";	//url of the pokemon API

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

// Expects pokemon object as parameter. Will create list item in which a pokemon button is appended, which will open up the modal for pokemon
const addListItem = (pokemon) => {

//fetch url for small pokemon image, which is to be displayed on the pokemon button	
	
	fetch(pokemon.detailsUrl).then(function (response) {
		return response.json();													
	}).then(function (json){
		pokemon.ButtonImgUrl = json.sprites.front_default;
	
//create list item and append to ul
	
		let listElement = document.createElement('li');
		listElement.classList.add("pokemon-list-item",'col-12','col-sm-6','col-md-4','col-lg-3','list-group-item');
		listElement.setAttribute("id",pokemon.name);
		document.querySelector("ul.pokemon-list").appendChild(listElement);
//create pokemon button and append to ListElement

		let pokemonButton = document.createElement('button');	
		pokemonButton.classList.add('btn-block','pokemon-button');	
		pokemonButton.setAttribute("data-toggle","modal");	
		pokemonButton.setAttribute("data-target","#pokemonModal");	
		addPokemonButtonEvent(pokemonButton,pokemon);
		listElement.appendChild(pokemonButton);

//create bootstrap container div and append to the pokemonButton

		let buttonContainer = document.createElement("div");
		buttonContainer.classList.add("container-fluid","button-container");
		pokemonButton.appendChild(buttonContainer);

//create bootstrap row div and append to buttonContainer

		let buttonRow = document.createElement("div");
		buttonRow.classList.add("row","button-row");
		buttonContainer.appendChild(buttonRow);

//create 3 bootstrap column div's (25%|50%|25%). First holds pokemonButtonImg. Middle holds pokemon name. 
//Right one for correct centering of pokemon name on button

		//first column
		let buttonImgColumn = document.createElement("div");
		buttonImgColumn.classList.add("col-3","button-img-col");
		buttonRow.appendChild(buttonImgColumn);

		//second column
		let pokemonButtonText = document.createElement("div");
		pokemonButtonText.classList.add("col-6","pokemon-button-text","align-middle");
		pokemonButtonText.innerText = capitalizeFirstChar(pokemon.name)
		buttonRow.appendChild(pokemonButtonText);

		//third column
		let emptyButtonDiv = document.createElement("div");
		emptyButtonDiv.classList.add("col-3","empty-button-div");
		buttonRow.appendChild(emptyButtonDiv);

//create image and append to buttonRow as 1/4 bootstrap column

		let pokemonButtonImg = document.createElement("img");
		pokemonButtonImg.setAttribute("src",pokemon.ButtonImgUrl);	
		pokemonButtonImg.classList.add("pokemon-button-img","align-middle");
		buttonImgColumn.appendChild(pokemonButtonImg);
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
		modalHeader.innerText = capitalizeFirstChar(pokemon.name);

		//Setting displayed height value 
		modalHeight.innerText = pokemon.height/10 + " m";

		//Setting displayed weight value
		modalWeight.innerText = pokemon.weight/10 + " kg";
				
		//Setting displayed types 
		let DisplayedPokemonTypes = "";	
		pokemon.types.forEach(function(types,index){
			if(index != 0)
			DisplayedPokemonTypes = DisplayedPokemonTypes + ", ";				//set comma in front of 2nd,3rd,etc type  
			DisplayedPokemonTypes = DisplayedPokemonTypes + capitalizeFirstChar(types.type.name);
		})
		
		modalTypes.innerText = DisplayedPokemonTypes;

		//Setting displayed abilities
		let displayedPokemonAbilities = "";	
		pokemon.abilities.forEach(function(abilities,index){
			if(index != 0)
			displayedPokemonAbilities = displayedPokemonAbilities + ", ";				//set comma in front of 2nd,3rd,etc ability
			displayedPokemonAbilities = displayedPokemonAbilities + capitalizeFirstChar(abilities.ability.name);			//concat the new type
		})

		modalAbilities.innerText = displayedPokemonAbilities;
	})
}
//shows details (through an event listener) when pokemon button is pressed
function addPokemonButtonEvent(button,pokemon){
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
	  item.imageUrl = details.sprites.other.dream_world.front_default;
	  item.height = details.height;
	  item.weight = details.weight;
	  item.types = details.types;
	  item.abilities = details.abilities;
	}).catch(function (e) {
	  console.error(e);
	});
 }

 let searchInput = document.getElementById("pokemon-search");
 
 searchInput.addEventListener("keyup",function(){
//	document.getElementById("bulbasaur").classList.add("d-none");

	document.querySelectorAll(".pokemon-list-item").forEach(function(item){
		item.classList.add("d-none");
		
		if(item.id.startsWith(searchInput.value.toLowerCase()))
			item.classList.remove("d-none");
	})

 })


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

//Capitalizes first letter of a string

function capitalizeFirstChar(myString){
	return myString.charAt(0).toUpperCase() + myString.slice(1);
}

/************************************************************************************************************************************/

pokemonRepository.loadList().then(function(){
	pokemonRepository.getAll().forEach(function(pokemon){
		pokemonRepository.addListItem(pokemon);
	})
})

