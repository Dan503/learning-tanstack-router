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
			<h2>Login</h2>
			{isLoggedIn ? (
				<>
					<p>Hello User!</p>
					<button
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
					<p>Who are you?</p>
					<button
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
