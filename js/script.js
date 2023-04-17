const pokemonImage = document.querySelector('.pokemonImage');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonName = document.querySelector('.pokemonName');
const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const btnPrev = document.querySelector('.btnPrev');
const btnNext = document.querySelector('.btnNext');

let searchPokemon = 1;

const fetchPokemon = async ( pokemon ) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    

    if(APIResponse.status === 200){

        const data = await APIResponse.json();
        return data;

    }

}

const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if(data){

        pokemonImage.style.display = 'block';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        input.value = '';
        searchPokemon = data.id;

    }else{

        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = '';
        pokemonName.innerHTML = 'Not found!';
        input.value = '';

    }
    
}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

})

btnPrev.addEventListener('click', () => {

    if(searchPokemon > 1){

        searchPokemon -= 1;
        renderPokemon(searchPokemon);

    }

})

btnNext.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);

})

renderPokemon(searchPokemon);




