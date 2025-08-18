import { createFileRoute } from '@tanstack/react-router'
import { fetchPokemon } from '../utils/pokemon'

export const Route = createFileRoute('/pokemon_/$id')({
	component: RouteComponent,
	loader: async ({ params }) => await fetchPokemon(params.id),
})

function RouteComponent() {
	const pokemon = Route.useLoaderData()
	return (
		<div className="p-4">
			<h1 className="font-bold text-xl capitalize">{pokemon.name}</h1>
			<div className="flex gap-2">
				<img src={pokemon.sprites.front_default} alt="Front" />
				<img src={pokemon.sprites.back_default} alt="back" />
			</div>
			<ul className="list-disc pl-6">
				<li>
					<strong>Height: </strong>
					{pokemon.height} ft
				</li>
				<li>
					<strong>Weight: </strong>
					{pokemon.weight} pounds
				</li>
				<li>
					<strong>ID #: </strong>
					{pokemon.id}
				</li>
			</ul>

			<h2 className="font-bold text-lg capitalize mt-4">Abilities</h2>
			<ul className="list-disc pl-6">
				{pokemon.abilities.map((ability) => (
					<li key={ability.ability.name}>{ability.ability.name}</li>
				))}
			</ul>
		</div>
	)
}
