/// <reference types="vite/client" />
import {
	HeadContent,
	Link,
	Scripts,
	createRootRouteWithContext,
	type ActiveOptions,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import type { FileRoutesByTo } from '../routeTree.gen'
import type { AuthContext } from '../utils/auth'

export interface RouterContext {
	authentication: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png',
			},
			{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
			{ rel: 'icon', href: '/favicon.ico' },
		],
	}),
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => <NotFound />,
	shellComponent: RootDocument,
})

interface NavInfo {
	href: keyof FileRoutesByTo
	label: string
	activeOptions?: ActiveOptions
}

const mainNav: Array<NavInfo> = [
	{
		href: '/',
		label: 'Home',
		activeOptions: {
			exact: true,
		},
	},
	{
		href: '/pokemon',
		label: 'Pokemon',
	},
	{
		href: '/login',
		label: 'Log in',
	},
]

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			<body>
				<ul className="p-2 flex gap-2 text-lg list-none">
					{mainNav.map((item) => (
						<li key={item.href}>
							<Link
								to={item.href}
								activeProps={{
									className: 'font-bold',
								}}
								activeOptions={item.activeOptions}
							>
								{({ isActive, isTransitioning }) => (
									<>
										{isActive && '❄️ '}
										{isTransitioning && '⌛ '}
										{item.label}
										{isActive && ' ❄️'}
									</>
								)}
							</Link>
						</li>
					))}
				</ul>

				<hr />
				{children}
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
			</body>
		</html>
	)
}
