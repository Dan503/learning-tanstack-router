/// <reference types="vite/client" />
import {
	HeadContent,
	Link,
	Scripts,
	createRootRoute,
	createRootRouteWithContext,
	type ActiveOptions,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import type { FileRoutesByTo, FileRouteTypes } from '../routeTree.gen'
import type { AuthContext } from '../utils/auth'
import { useIsMounted } from '../utils/useIsMounted'

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
			...seo({
				title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
				description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
			}),
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
		scripts: [
			// {
			// 	src: '/customScript.js',
			// 	type: 'text/javascript',
			// },
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
		href: '/posts',
		label: 'Posts',
	},
	{
		href: '/users',
		label: 'Users',
	},
	{
		href: '/route-a',
		label: 'Route A',
	},
	{
		href: '/deferred',
		label: 'Deferred',
	},
	{
		// @ts-expect-error
		href: '/this-route-does-not-exist',
		label: '404 page',
	},
	{
		href: '/login',
		label: 'Log in',
	},
]

function RootDocument({ children }: { children: React.ReactNode }) {
	const isMounted = useIsMounted()
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

					<li>
						<Link
							to="/search"
							activeProps={{ className: 'font-bold' }}
							activeOptions={{
								includeSearch: false,
							}}
							search={{
								query: 'Hello',
								hasDiscount: false,
								categories: ['electronics', 'clothing'],
							}}
						>
							{({ isActive, isTransitioning }) => (
								<>
									{isActive && '❄️ '}
									{isTransitioning && '⌛ '}
									Search
									{isActive && ' ❄️'}
								</>
							)}
						</Link>
					</li>
				</ul>

				<hr />
				{children}

				{isMounted && (
					<>
						<TanStackRouterDevtools position="bottom-right" />
					</>
				)}
				<Scripts />
			</body>
		</html>
	)
}
