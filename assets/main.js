//Elementos del HTML
const form = document.querySelector(".form");
const pokemonInput = document.querySelector(".pokemon-input");
const button = document.querySelector(".submit");
const cardContainer = document.querySelector(".card__container");

const searchPokemon = async (e) => {
  e.preventDefault();

  //fc validacion que el imput no este vacio
  if (pokemonInput.value.trim() === "") {
    alert("Ingresa un número de Pokémon");
    return;
  }

  //fc relizar el fetch
  const fetchedPokemon = await fetchPokemons(pokemonInput.value);

  //REVISAR MENSAJE DE NO ENCONTRADO
  if (!fetchedPokemon.id) {
    alert("Este Pokémon no existe");
    form.reset();
    return;
  }

  //fc renderizar pokemon
  renderPokemonCard(fetchedPokemon);
};

const renderPokemonCard = (pokemonData) => {
  cardContainer.innerHTML = createCardTemplate(pokemonData);
};

const pokemonTemplate = (pokemonData) => {
  return {
    name: pokemonData.name.toUpperCase(),
    image: pokemonData.sprites.other.home.front_default,
    height: pokemonData.height / 10,
    weight: pokemonData.weight / 10,
    types: pokemonData.types,
  };
};

const createCardTemplate = (pokemonData) => {
  const { name, image, height, weight, types } = pokemonTemplate(pokemonData);
  return `
    <div class="card">
        <img
          class="card__img"
          src="${image}"
          alt="${name}"
        />
        <h2 class="card__name">${name}</h2>
        <div class="poke-type">${types
          .map((type) => {
            return `<span class="card__type">${type.type.name.toUpperCase()}</span>`;
          })
          .join("")}</div>
        <p class="card__info">Peso: ${weight} kg - Altura: ${height} m</p>
      </div>
    `;
};

//Fc inicializadora
const init = () => {
  button.addEventListener("click", searchPokemon);
};

init();
