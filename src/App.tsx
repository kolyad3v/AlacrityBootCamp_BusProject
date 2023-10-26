import { useState } from 'react'
import './App.css'
import BusStateEditor from './components/BusStateEditor'
import BusStop from './components/BusStop'
import { IBusState, IBusStateEditor } from './types'
import BusStopSelector from './components/BusStopSelector'

function App() {
	// Using Mapped Types for fun.
	const [busState, setBusState] = useState<{
		[K in keyof IBusState]: IBusState[K]
	}>({
		peopleOnBus: 10,
		totalSeats: 20,
	})
	const { totalSeats } = busState

	const [editBusState, setEditBusState] = useState<IBusStateEditor>({
		currentlyEditing: false,
		totalSeatsEditor: '',
		peopleOnBusEditor: '',
	})

	const { currentlyEditing }: IBusStateEditor = editBusState

	const getAvailableSeats = (busState: IBusState): number => {
		const { peopleOnBus, totalSeats } = busState
		return totalSeats - peopleOnBus
	}

	const [numberOfBusStops, setNumberOfBusStops] = useState<number>(3)

	const busStops = Array.from({ length: numberOfBusStops }, (_, index) => (
		<BusStop
			key={index}
			busState={busState}
			setBusState={setBusState}
			getAvailableSeats={getAvailableSeats}
		/>
	))

	return (
		<>
			<h1>Bus App</h1>
			<div className='card bus'>
				<p>People onboard: {totalSeats - getAvailableSeats(busState)}</p>{' '}
				<p>Available Bus Seats: {getAvailableSeats(busState)}</p>{' '}
				<p>Total Seats: {totalSeats}</p>
				{!currentlyEditing && (
					<button
						onClick={() => {
							setEditBusState({
								...editBusState,
								currentlyEditing: !currentlyEditing,
							})
						}}
					>
						Edit
					</button>
				)}
				{currentlyEditing && (
					<BusStateEditor
						busState={busState}
						editBusState={editBusState}
						setBusState={setBusState}
						setEditBusState={setEditBusState}
					/>
				)}
			</div>
			<BusStopSelector
				numberOfBusStops={numberOfBusStops}
				setNumberOfBusStops={setNumberOfBusStops}
			/>

			<div className='busStops'>{busStops}</div>
		</>
	)
}

export default App
