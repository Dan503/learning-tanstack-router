import type { Pokemon, NamedApiResourceList } from 'pokeapi-typescript'

export async function fetchPokemon(id: string): Promise<Pokemon> {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
	return await response.json()
}

export async function fetchPokemonList(): Promise<
	NamedApiResourceList<{ name: string; url: string }>
> {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
	return await response.json()
}
