// This file needed to be created as a replacement for the default that Tanstack-Start uses under the hood
import { StrictMode, useEffect, useRef } from 'react'
import { useAuth } from './utils/auth'
import { createRouter } from './router'
import { StartClient } from '@tanstack/react-start/client'
import { hydrateRoot } from 'react-dom/client'

console.log('entry file loaded')

function App() {
	console.log('client.tsx ran!!!')
	// ✅ Use a hook in a component for auth
	const authentication = useAuth()
	// create once
	const routerContextRef = useRef(createRouter({ authentication }))

	// keep router context in sync when auth changes (tokens/refresh/etc.)
	useEffect(() => {
		routerContextRef.current.update({ context: { authentication } })
		// routerContextRef.current.invalidate()
	}, [authentication.isLoggedIn])

	return <StartClient router={routerContextRef.current} />
}

hydrateRoot(
	document,
	<StrictMode>
		<App />
	</StrictMode>,
)
