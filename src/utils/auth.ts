import { redirect } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'

function isAuthenticated() {
	return localStorage.getItem('isAuthenticated') === 'true'
}

function signIn() {
	return localStorage.setItem('isAuthenticated', 'true')
}

function signOut() {
	return localStorage.removeItem('isAuthenticated')
}

export function useAuth() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	// set the real logged in status after component mounts in the DOM
	useEffect(() => {
		setIsLoggedIn(isAuthenticated())
	}, [])

	const login = useCallback(() => {
		signIn()
		setIsLoggedIn(true)
	}, [])

	const logout = useCallback(() => {
		signOut()
		setIsLoggedIn(false)
	}, [])

	const secureTheRoute = useCallback(() => {
		if (!isLoggedIn) {
			throw redirect({
				to: '/login',
			})
		}
	}, [isLoggedIn])

	return {
		isLoggedIn,
		login,
		logout,
		secureTheRoute,
	}
}

export type AuthContext = ReturnType<typeof useAuth>
