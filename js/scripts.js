//Nesting PokemonList in a IIFE

let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=600";	//url of the pokemon API
	

// returns the entire pokemon list

function getAll() {
	  return pokemonList;
}

//Add item to pokemonList if valid format

function add(item) {
	if(isPokemon(item))
		pokemonList.push(item);
	else
		console.log("One of the items was not a pokemon!");
}

//Will create a list item and append a button based on the pokemon given as argument. Button will open modal
//with more information about pokemon
const addListItem = (pokemon) => {

//fetch url for small pokemon image, which is to be displayed on the pokemon button	
	
	fetch(pokemon.detailsUrl).then(function (response) {
		return response.json();													
	}).then(function (json){
		pokemon.ButtonImgUrl = json.sprites.front_default;
	
//create list item and append to ul
	
		let listElement = document.createElement("li");
		listElement.classList.add("pokemon-list-item","col-12","col-md-6","col-xl-4","list-group-item");
		listElement.setAttribute("id",pokemon.name);
		document.querySelector("ul.pokemon-list").appendChild(listElement);

//create pokemon button and append to ListElement

		let pokemonButton = document.createElement("button");	
		pokemonButton.classList.add("btn-block","pokemon-button");	
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

//create 3 bootstrap column div`s (25%|  50%  |25%). First holds pokemonButtonImg. Middle displays pokemon name. 
//Right one added to center pokemon name on button

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

//create image and append to first button column

		let pokemonButtonImg = document.createElement("img");
		pokemonButtonImg.setAttribute("src",pokemon.ButtonImgUrl);	
		pokemonButtonImg.classList.add("pokemon-button-img","align-middle");
		buttonImgColumn.appendChild(pokemonButtonImg);
	})
}

//Is called when a pokemon button is pressed. Writes info about pokemon into modal
function showDetails(pokemon){
	loadDetails(pokemon).then(function(){

//naming modal elements for convenience

		let modalHeader = document.querySelector(".modal-title");
		let modalHeight = document.querySelector(".modal-height");
		let modalWeight = document.querySelector(".modal-weight");
		let modalTypes = document.querySelector(".modal-types");		
		let modalImg =  document.querySelector(".modal-image");
		

		//Setting src attribute
		modalImg.setAttribute("src",pokemon.imageUrl);							
				
		//setting value for modal header
		modalHeader.innerText = capitalizeFirstChar(pokemon.name);

		//Setting displayed height value 
		modalHeight.innerText = pokemon.height/10 + " m";

		//Setting displayed weight value
		modalWeight.innerText = pokemon.weight/10 + " kg";
				
		//Setting displayed pokemon types 
		let DisplayedPokemonTypes = "";	
		pokemon.types.forEach(function(types,index){
			if(index != 0)
			DisplayedPokemonTypes = DisplayedPokemonTypes + ", ";				//set comma in front of 2nd,3rd,etc type  
			DisplayedPokemonTypes = DisplayedPokemonTypes + capitalizeFirstChar(types.type.name);
		})

		//deleting ability descriptions from previous pokemon
		modalTypes.innerText = DisplayedPokemonTypes;
		document.querySelector(".modal-abilities-description-row").innerText ="";

		//Setting displayed abilities and ability descriptions on modal
		showAbilities(pokemon);
		
	})
}

//calls the showDetails function ,when pokemon a button is pressed
function addPokemonButtonEvent(button,pokemon){
	button.addEventListener("click", function () {
		showDetails(pokemon);
		})
	}

//fetches list from API and adds pokemon to pokemonList[]
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

//loads a pokemons details by using the url saved in a pokemon object
function loadDetails(item) {
	return fetch(item.detailsUrl).then(function (response) {
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

//Creates an eventlistener for every ability button on the modal, which will make only the pressed ability`s description visible
function abilityButtonEvent(button){
	button.addEventListener("click",function(){
		document.querySelectorAll(".ability-description").forEach(function(item){
			item.classList.add("d-none");
		})
		document.getElementById(`${button.innerText.toLowerCase()}-text`).classList.remove("d-none");
	});
}

//Will load ability descriptions from API and set up the the correct info on the modal
function showAbilities(pokemon) {
	//deleting abilities from previous pokemon
	let modalAbilities = document.querySelector(".modal-abilities");
	modalAbilities.innerText = "";
	//Not elegantly written, but works for now. If non array is chosen only last button will get an event handler
	let i = 0;		//i is never incremented
	let abilityButton = [];
	
	//loops through entire abilities array and creates a button for each ability, which will display a corresponding ability description
	pokemon.abilities.forEach((ability)=>{

		//creating button
		abilityButton[i] = document.createElement("button");

		//setting button id. is used by buttons event handler to make the corresponding ability description visible 
		//abilityButton[i].setAttribute("id",`${ability.ability.name}-button`);

		//setting button classes. Are used by event handler to make all ability description invisible, before turning (though id) the correct one visible
		abilityButton[i].classList.add("modal-ability-button");

		//naming the button after the ability
		abilityButton[i].innerText = capitalizeFirstChar(ability.ability.name);

		//event handler for button
		abilityButtonEvent(abilityButton[i],ability.ability.name);

		//Appending the button to modal
		document.querySelector(".modal-abilities").appendChild(abilityButton[i]);
		
		//creating a div which will hold the ability description
		let abilityDescription = document.createElement("div");
		abilityDescription.classList.add("col","offset-3","col-9","ability-description","d-none");
		
		//setting ability descriptions id. is used by event handler to make the correct div visible
		abilityDescription.setAttribute("id",`${ability.ability.name}-text`);

		//loading the ability description from API
		fetch(ability.ability.url).then(function (response) {
			return response.json();
		 })
			 .then(function (abilityDetails) {

				//On some abilities API had german language second instead of first, which resulted in german text being displayed
				//Loops through all effect_entries and displays text from the one with english language
				abilityDetails.effect_entries.forEach(function(entry){
					if(entry.language.name == "en")		
					abilityDescription.innerText = entry.short_effect;
				})
				
				//appending the div to modal
				document.querySelector(".modal-abilities-description-row").appendChild(abilityDescription);
				
			})
			.catch(function() {
				return "Could not retrieve ability details!"; //will be displayed instead of description if something went wrong
			})
				
		})
}

//search input
let searchInput = document.getElementById("pokemon-search");
 
//event handler for the search field 
searchInput.addEventListener("keyup",function(){

	//iterates through every list item
	document.querySelectorAll(".pokemon-list-item").forEach(function(item){
		//turn list item invisible
		item.classList.add("d-none");
		//turn list item visible again if the list items id start with the specifies search criteria
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
		loadDetails : loadDetails,
		abilityButtonEvent : abilityButtonEvent,
		showAbilities : showAbilities
	};
})();

/**********************************************************************Function declarations*******************************************/

// isPokemon() : Will return true if item is a  valid "pokemon" by checking that it is an object,
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

