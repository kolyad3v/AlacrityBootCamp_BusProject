import { useState } from 'react'
import './App.css'
import BusStateEditor from './components/BusStateEditor'
import BusStop from './components/BusStop'
import { IBusState, IBusStateEditor } from './types'
import BusStopSelector from './components/BusStopSelector'

function App() {
	const [busState, setBusState] = useState<IBusState>({
		peopleOnBus: 10,
		totalSeats: 20,
	})
	const { peopleOnBus, totalSeats } = busState

	const [editBusState, setEditBusState] = useState<IBusStateEditor>({
		currentlyEditing: false,
		totalSeatsEditor: '',
		peopleOnBusEditor: '',
	})

	const { currentlyEditing }: IBusStateEditor = editBusState

	const getAvailableSeats = (): number => {
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
			<h1>Vite + React</h1>
			<div className="card bus">
				<p>People onboard: {totalSeats - getAvailableSeats()}</p>{' '}
				<p>Available Bus Seats: {getAvailableSeats()}</p>{' '}
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

			<div className="busStops">{busStops}</div>
		</>
	)
}

export default App
