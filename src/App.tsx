import { useState } from "react";
import "./App.css";
import BusStateEditor from "./components/BusStateEditor";
import BusStop from "./components/BusStop";

function App() {
	const [busState, setBusState] = useState<{
		peopleOnBus: number;
		totalSeats: number;
	}>({
		peopleOnBus: 10,
		totalSeats: 20,
	});
	const { peopleOnBus, totalSeats } = busState;

	const [editBusState, setEditBusState] = useState<{
		currentlyEditing: boolean;
		totalSeatsEditor: string;
		peopleOnBusEditor: string;
	}>({
		currentlyEditing: false,
		totalSeatsEditor: "",
		peopleOnBusEditor: "",
	});

	const {
		currentlyEditing,
	}: {
		currentlyEditing: boolean;
		totalSeatsEditor: string;
		peopleOnBusEditor: string;
	} = editBusState;

	const getAvailableSeats = (): number => {
		return totalSeats - peopleOnBus;
	};

	return (
		<>
			<h1>Vite + React</h1>
			<div className="card bus">
				<p>People onboard: {totalSeats - getAvailableSeats()}</p>{" "}
				<p>Available Bus Seats: {getAvailableSeats()}</p>{" "}
				<p>Total Seats: {totalSeats}</p>
				{!currentlyEditing && (
					<button
						onClick={() => {
							setEditBusState({ ...editBusState, currentlyEditing: !currentlyEditing });
						}}>
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
			<BusStop
				busState={busState}
				setBusState={setBusState}
				getAvailableSeats={getAvailableSeats}
			/>
		</>
	);
}

export default App;
