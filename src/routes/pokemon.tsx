import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchPokemonList } from '../utils/pokemon'

export const Route = createFileRoute('/pokemon')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		console.log('beforeLoad ran on /pokemon route')
		return context.authentication.secureTheRoute()
	},
	loader: async ({}) => await fetchPokemonList(),
})

function RouteComponent() {
	const { results } = Route.useLoaderData()
	return (
		<>
			<h1 className="text-3xl">Hello "/pokemon"!</h1>
			<ol className="list-decimal pl-8">
				{results.map((r) => (
					<li key={r.url}>
						<Link
							to="/pokemon/$id"
							params={{ id: r.name }}
							className="capitalize hover:underline"
						>
							{r.name}
						</Link>
					</li>
				))}
			</ol>
		</>
	)
}
