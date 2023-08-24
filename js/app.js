const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(fetchData());
    const ramdom = getRandomInt(1, 152)
    fetchData(ramdom)
})


const fetchData = async (id) => {

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const res2 = await fetch(`https://pokeapi.co/api/v2/move/${id}/`);
        const data = await res.json();
        const data2 = await res2.json();

        const pokemon = {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial: data.stats[3].base_stat,
            descripcion: data2.flavor_text_entries[62].flavor_text
        }
        pintarCard(pokemon);

    } catch (error) {
        console.log(error);
    }

}

const pintarCard = (pokemon) => {
    const container = document.querySelector('.conteiner');
    const template = document.querySelector('#template').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.image').setAttribute('src', `${pokemon.img}`);
    clone.querySelector('h2').innerHTML = `${pokemon.nombre} <span>${pokemon.hp}hp</span>`
    clone.querySelector('.content p').textContent = pokemon.descripcion + ` ${pokemon.experiencia}exp.`
    clone.querySelectorAll('.skills__ks p')[0].textContent = pokemon.ataque + 'K'
    clone.querySelectorAll('.skills__ks p')[1].textContent = pokemon.especial + 'K'
    clone.querySelectorAll('.skills__ks p')[2].textContent = pokemon.defensa + 'K'


    fragment.appendChild(clone);
    container.appendChild(fragment)
}
