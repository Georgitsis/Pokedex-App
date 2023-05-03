//Nesting PokemonList in a IIEF
let pokemonRepository = (function () {
	let pokemonList = [];
  
	function add(item) {
		if(isPokemon(item))
			pokemonList.push(item);
		else
			alert("Not a Pokemon");
	}
  
	function getAll() {
	  return pokemonList;
	}

	return {
	  add : add,
	  getAll : getAll,
	};
})();
  
//*****Function declarations**********

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



pokemonRepository.add({ name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']});
pokemonRepository.add({  name: 'Pikachu', height: 0.4, types: ['electric']});
pokemonRepository.add({ name: 'Weedle', height: 0.3, types: ['bug', 'poison']});
pokemonRepository.add({ name: 'Onix', height: 8.8, types: ['rock', 'ground']});
pokemonRepository.add({ name: 'Drapion', height: 1.3, types: ['poison','dark']});
pokemonRepository.add({ engine:"electric", wheels : 4});												//object to test the isPokemon function


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
