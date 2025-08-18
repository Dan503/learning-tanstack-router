import { createLink, type LinkProps } from '@tanstack/react-router'
import { forwardRef, type AnchorHTMLAttributes } from 'react'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	customProp?: string
}

const BaseLinkComponent = forwardRef<HTMLAnchorElement, Props>(
	({ customProp, className, ...rest }, ref) => {
		return (
			<a
				ref={ref}
				{...rest}
				className={`text-blue-300 hover:underline ${className ?? ''}`}
			/>
		)
	},
)

const TanStackCustomLink = createLink(BaseLinkComponent)

export function CustomLink({
	children,
	...props
}: LinkProps<typeof TanStackCustomLink>) {
	return (
		<TanStackCustomLink
			{...props}
			activeProps={{
				className: 'font-bold',
			}}
			activeOptions={{
				includeSearch: false,
			}}
			customProp="hello"
		>
			{({ isActive, isTransitioning }) => (
				<>
					{isActive && '❄️ '}
					{isTransitioning && '⌛ '}
					{children}
					{isActive && ' ❄️'}
				</>
			)}
		</TanStackCustomLink>
	)
}
