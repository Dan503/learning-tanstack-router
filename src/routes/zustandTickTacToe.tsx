import { createFileRoute } from '@tanstack/react-router'
import { create } from 'zustand'

export const Route = createFileRoute('/zustandTickTacToe')({
	component: RouteComponent,
})

type Squares = Array<'x' | 'o' | null>

type SetStateFnParam<T> = T | ((oldState: T) => T)
type SetStateFn<T> = (newState: SetStateFnParam<T>) => void

function createSetterFn<
	State extends Record<string, any>,
	Key extends keyof State,
>(set: SetFn<State>, key: Key) {
	type Value = State[Key]
	type Prev = (oldState: Value) => Value

	const setterFn: SetStateFn<State[Key]> = (
		newState: SetStateFnParam<State[Key]>,
	) => {
		set((oldState) => ({
			...oldState,
			[key as Key]:
				typeof newState === 'function'
					? (newState as Prev)(oldState[key])
					: newState,
		}))
	}

	return setterFn
}

type SetFn<StateObject extends Record<string, any>> = {
	(
		partial:
			| StateObject
			| Partial<StateObject>
			| ((state: StateObject) => StateObject | Partial<StateObject>),
		replace?: false,
	): void
	(
		state: StateObject | ((state: StateObject) => StateObject),
		replace: true,
	): void
}

interface GameStore {
	squares: Squares
	setSquares: SetStateFn<Squares>
	xIsNext: boolean
	setXIsNext: SetStateFn<boolean>
}

const useGameStore = create<GameStore>()((set): GameStore => {
	const setSquares = createSetterFn(set, 'squares')
	const setXIsNext = createSetterFn(set, 'xIsNext')

	return {
		squares: new Array(9).fill(null),
		setSquares,
		xIsNext: true,
		setXIsNext,
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
				{squares.map((value, index) => {
					return <Square key={index} value={value} index={index} />
				})}
			</div>
		</div>
	)
}

interface SquareProps {
	index: number
	value: Squares[0]
	// onSquareClick: () => void
}

function Square({ index }: SquareProps) {
	const squares = useGameStore((state) => state.squares)
	const setSquares = useGameStore((state) => state.setSquares)
	const xIsNext = useGameStore((state) => state.xIsNext)
	const setXIsNext = useGameStore((state) => state.setXIsNext)

	const thisSquare = squares[index]

	function onSquareClick() {
		// don't do anything if there is already a value
		if (squares[index]) return
		// create a clone
		const nextSquares = squares.slice()
		nextSquares[index] = xIsNext ? 'x' : 'o'
		setSquares(nextSquares)
		setXIsNext((prev) => !prev)
	}

	return (
		<button
			onClick={onSquareClick}
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
}

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
