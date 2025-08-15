import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/search')({
	component: RouteComponent,
	validateSearch: (search): ItemFilters => {
		return {
			query: search.query as string,
			hasDiscount:
				search.hasDiscount === 'true' || search.hasDiscount === true,
			categories: search.categories as Array<Category>,
		}
	},
})

interface ItemFilters {
	query?: string
	hasDiscount?: boolean
	categories?: Array<Category>
}

type Category = 'electronics' | 'clothing' | 'books' | 'toys'

function RouteComponent() {
	const { query, categories, hasDiscount } = Route.useSearch()
	const navigate = useNavigate({ from: Route.fullPath })

	function updateFilter<Key extends keyof ItemFilters>(
		filter: Key,
		value: ItemFilters[Key],
		options?: { replace: boolean },
	) {
		navigate({
			...options,
			search: (prev) => ({ ...prev, [filter]: value }),
		})
	}

	console.log({ hasDiscount })

	return (
		<div>
			<h1>Search</h1>
			<input
				value={query}
				onChange={(e) => {
					updateFilter('query', e.target.value)
				}}
			/>
			<label>
				Discount?
				<input
					type="checkbox"
					checked={hasDiscount}
					onChange={(e) => {
						updateFilter('hasDiscount', e.target.checked)
					}}
				/>
			</label>
			<select
				multiple
				value={categories}
				onChange={(e) =>
					updateFilter(
						'categories',
						Array.from(
							e.target.selectedOptions,
							(opt) => opt.value as Category,
						),
					)
				}
			>
				<option>electronics</option>
				<option>clothing</option>
				<option>books</option>
				<option>toys</option>
			</select>
			<pre>
				{JSON.stringify({ query, categories, hasDiscount }, null, 4)}
			</pre>
		</div>
	)
}
