import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

function RouteComponent() {
	const { authentication } = Route.useRouteContext()
	const { isLoggedIn, login, logout } = authentication
	const router = useRouter()
	return (
		<>
			<h2 className="text-2xl mb-2">Login page</h2>
			{isLoggedIn ? (
				<>
					<p className="mb-4 text-yellow-200">Hello User!</p>
					<button
						className="border-2 p-2 border-white rounded-md"
						onClick={() => {
							logout()
							router.invalidate()
						}}
					>
						Log out
					</button>
				</>
			) : (
				<>
					<p className="mb-4 text-blue-200">Who are you?</p>
					<button
						className="border-2 p-2 border-white rounded-md"
						onClick={() => {
							console.log('log in clicked')
							login()
							console.log('log in ran')
							router.invalidate()
						}}
					>
						Log In
					</button>
				</>
			)}
		</>
	)
}
