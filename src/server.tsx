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
			authentication: {
				isLoggedIn: false,
				login: () => {},
				logout: () => {},
				secureTheRoute() {
					// Server assumes logged-out for this demo
					throw redirect({
						to: '/login',
						// optional: bounce back after auth
						// search: { redirect: request.url }  // if you pass request here
					})
				},
			},
		})
	},
})(defaultStreamHandler)
