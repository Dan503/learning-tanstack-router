/// <reference types="vite/client" />
import {
	HeadContent,
	Link,
	Scripts,
	createRootRoute,
	type ActiveOptions,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import type { FileRoutesByTo } from '../routeTree.gen'
import { useIsMounted } from '../utils/useIsMounted'
import { CustomLink } from '../components/CustomLink'

export const Route = createRootRoute({
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
			{
				src: '/customScript.js',
				type: 'text/javascript',
			},
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
		href: '/serverCounter',
		label: 'Server counter',
	},
	{
		// @ts-expect-error
		href: '/this-route-does-not-exist',
		label: '404 page',
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
							<CustomLink to={item.href}>{item.label}</CustomLink>
						</li>
					))}

					<li>
						<CustomLink
							to="/search"
							search={{
								query: 'Hello',
								hasDiscount: false,
								categories: ['electronics', 'clothing'],
							}}
						>
							Search
						</CustomLink>
					</li>
				</ul>

				<hr />
				{children}

				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
			</body>
		</html>
	)
}
