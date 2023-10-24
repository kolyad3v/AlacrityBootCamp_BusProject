import { useState } from 'react'
import './App.css'

function App() {
	const [busState, setBusState] = useState<{
		availableSeats: number
		totalSeats: number
	}>({
		availableSeats: 10,
		totalSeats: 20,
	})

	const [passengersWaitingAtBusStop, setPassengersWaitingAtBusStop] =
		useState<number>()
	const handleBusStopPassengerNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (/\d+/.test(e.target.value))
			setPassengersWaitingAtBusStop(parseInt(e.target.value))
	}

	return (
		<>
			<h1>Vite + React</h1>
			<div className="card">
				<p>Available Bus Seats: {busState.availableSeats}</p>
			</div>

			<div className="card">
				<p>Bus Stop</p>
				<p>People waiting: {passengersWaitingAtBusStop}</p>
				<input
					type="text"
					value={passengersWaitingAtBusStop}
					onChange={(e) => handleBusStopPassengerNumber(e)}
				/>
			</div>
		</>
	)
}

export default App
