//Nesting PokemonList
let pokemonRepository = (function () {
	let pokemonList = [];
  
	function add(pokemon) {
		if(isPokemon(pokemon))
			pokemonList.push(pokemon);
		else
			alert("Not a Pokemon");
	}
  
	function getAll() {
	  return pokemonList;
	}

	function isPokemon(pokemon){
		let correctObjectKeys = ["name","height","types"];
		let correctObjectKeysTypes = ["string","number","object"]
		if(typeof pokemon !== "object")
			return false;
		else if (Object.keys(pokemon).toString()!=="name,height,types")
			return false;
		Object.keys(pokemon).forEach(function (objectKey,index) {
			if(objectKey !== correctObjectKeys[index])
				return false;
			else if (pokemon[objectKey]!==correctObjectKeysTypes[index])
				return false;
		})
		return true;
	}
  
	return {
	  add : add,
	  getAll : getAll,
	  isPokemon : isPokemon
	};
  })();                                                     

  pokemonRepository.add({ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']});
  pokemonRepository.add({  name: 'Pikachu', height: 0.4, types: ['electric']});
  pokemonRepository.add({ engine:"electric", wheels : 4});

////adding several Pokemon objects to the array
/*pokemonList = [                                                               
	{ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},  
	{ name: 'Pikachu', height: 0.4, types: ['electric']},
	{ name: 'Weedle', height: 0.3, types: ['bug', 'poison']},
	{ name: 'Onix', height: 8.8, types: ['rock', 'ground']},
	{ name: 'Drapion', height: 1.3, types: ['poison','dark']}
];*/

for (let i=0;i<pokemonRepository.getAll().length;i++){
	let bigPokemon = pokemonRepository.getAll()[i].height > 8 ?"WOW - that is a big Pokemon!" :"";
	//document.write(pokemonList[i].name + " " + pokemonList[i].height + " " + bigPokemon +"<br><br>");
	document.write(`${pokemonRepository.getAll()[i].name} ${pokemonRepository.getAll()[i].height} ${bigPokemon}<br><br>`);
}

/*let array = ["name","height","types"];
document.write(array.toString() + "<br>");
//if("name,height,types" === Object.keys(pokemonRepository.getAll()[0]))
	document.write(Object.keys(pokemonRepository.getAll()[0]) + "<br><br>");

	let a=array;
	let b=Object.keys(pokemonRepository.getAll()[0]);
	//if(array.toString()===Object.keys(pokemonRepository.getAll()[0]))
	document.write(a.toString().trim());
	document.write(b.toString().trim());
	if("name,height,types"===b.toString())
	//document.write("NOW IT WORKED")
*/
