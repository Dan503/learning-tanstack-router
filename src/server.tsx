// src/server.tsx
import {
	createStartHandler,
	defaultStreamHandler,
} from '@tanstack/react-start/server'
import { createRouter } from './router'
import { redirect } from '@tanstack/react-router'

export default createStartHandler({
	createRouter: () => {
		return createRouter({
			// create dummy server context that will be replaced when the JS loads
			authentication: {
				isLoggedIn: false,
				login: () => {},
				logout: () => {},
				secureTheRoute() {
					// Server assumes logged-out for this demo
					throw redirect({ to: '/login' })
				},
			},
		})
	},
})(defaultStreamHandler)
