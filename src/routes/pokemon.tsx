import { createFileRoute, Link, useBlocker } from '@tanstack/react-router'
import { fetchPokemonList } from '../utils/pokemon'
import { useState } from 'react'

export const Route = createFileRoute('/pokemon')({
	component: RouteComponent,
	loader: async ({}) => await fetchPokemonList(),
})

function RouteComponent() {
	const { results } = Route.useLoaderData()
	const [canNavigate, setCanNavigate] = useState(false)
	const { proceed, reset, status } = useBlocker({
		shouldBlockFn: () => !canNavigate,
		withResolver: true,
	})
	return (
		<>
			<h1 className="text-3xl">Hello "/pokemon"!</h1>
			<button onClick={() => setCanNavigate(!canNavigate)}>
				Toggle can navigate: "{String(canNavigate)}"
			</button>
			<dialog open={status == 'blocked'}>
				<p>Are you sure you want to leave?</p>
				<button onClick={proceed}>Yes</button>
				<button onClick={reset}>No</button>
			</dialog>
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
