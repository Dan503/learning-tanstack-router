import { createFileRoute } from '@tanstack/react-router'
import { memo } from 'react'
import { create } from 'zustand'
import { createSetterFn, type SetStateFn } from 'zustand-create-setter-fn'

export const Route = createFileRoute('/zustandTickTacToe')({
	component: RouteComponent,
})

type Squares = Array<'x' | 'o' | null>

interface GameStore {
	squares: Squares
	setSquares: SetStateFn<Squares>
	xIsNext: boolean
	makeMove: (index: number) => void
}

const useGameStore = create<GameStore>()((set): GameStore => {
	const setSquares = createSetterFn(set, 'squares')

	return {
		squares: new Array(9).fill(null),
		setSquares,
		xIsNext: true,
		makeMove: (index) => {
			set((prevState) => {
				if (
					prevState.squares[index] ||
					calculateWinner(prevState.squares)
				)
					return prevState
				const nextSquares = prevState.squares.slice()
				nextSquares[index] = prevState.xIsNext ? 'x' : 'o'
				return {
					...prevState,
					squares: nextSquares,
					xIsNext: !prevState.xIsNext,
				}
			})
		},
	}
})

function RouteComponent() {
	return (
		<div className="grid gap-4">
			<h1>Hello "/zustandTutorial"!</h1>
			<Board />
		</div>
	)
}

function Board() {
	const squares = useGameStore((state) => state.squares)
	const winner = calculateWinner(squares)

	return (
		<div className="grid gap-4">
			{winner && (
				<p>
					<strong className="font-bold">Winner:</strong> {winner} 🎉
				</p>
			)}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gridTemplateRows: 'repeat(3, 1fr)',
					width: 'calc(3 * 2.5rem)',
					height: 'calc(3 * 2.5rem)',
					border: '1px solid #999',
				}}
			>
				{squares.map((_, index) => {
					return <Square key={index} index={index} />
				})}
			</div>
		</div>
	)
}

interface SquareProps {
	index: number
}

const Square = memo(({ index }: SquareProps) => {
	const thisSquare = useGameStore((state) => state.squares[index])
	const makeMove = useGameStore((state) => state.makeMove)

	console.log(`${index} rerendered`)

	return (
		<button
			onClick={() => {
				makeMove(index)
			}}
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 0,
				backgroundColor: '#fff',
				color: '#000',
				border: '1px solid #999',
				outline: 0,
				borderRadius: 0,
				fontSize: '1rem',
				fontWeight: 'bold',
			}}
		>
			{thisSquare}
		</button>
	)
})

function calculateWinner(squares: Squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a]
		}
	}

	return null
}
