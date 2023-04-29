//Creating variable and assigning it to a blank array
let pokemonList = []	                                                      

////adding several Pokemon objects to the array
pokemonList = [                                                               
	{ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},  
	{ name: 'Pikachu', height: 0.4, types: ['electric']},
	{ name: 'Weedle', height: 0.3, types: ['bug', 'poison']},
	{ name: 'Onix', height: 8.8, types: ['rock', 'ground']},
	{ name: 'Drapion', height: 1.3, types: ['poison','dark']}
];

for (let i=0;i<pokemonList.length;i++){
	let bigPokemon = pokemonList[i].height > 8 ?"WOW - that is a big Pokemon!" :"";
	//document.write(pokemonList[i].name + " " + pokemonList[i].height + " " + bigPokemon +"<br><br>");
	document.write(`${pokemonList[i].name} ${pokemonList[i].height} ${bigPokemon}<br><br>`);
}