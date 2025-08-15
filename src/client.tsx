// This file needed to be created as a replacement for the default that Tanstack-Start uses under the hood
import { StrictMode, useEffect, useRef } from 'react'
import { useAuth } from './utils/auth'
import { createRouter } from './router'
import { StartClient } from '@tanstack/react-start/client'
import { hydrateRoot } from 'react-dom/client'

console.log('entry file loaded')

function App() {
	console.log('client.tsx ran!!!')
	// Use an auth hook in the outer most root component in client.tsx
	const authentication = useAuth()
	// create the router context provider feeding it the useAuth result
	const routerContextRef = useRef(createRouter({ authentication }))

	// keep router context in sync when auth changes
	useEffect(() => {
		routerContextRef.current.update({ context: { authentication } })
	}, [authentication.isLoggedIn])

	// Feed the context into the StartClient component to give all pages access to it
	return <StartClient router={routerContextRef.current} />
}

hydrateRoot(
	document,
	<StrictMode>
		<App />
	</StrictMode>,
)
