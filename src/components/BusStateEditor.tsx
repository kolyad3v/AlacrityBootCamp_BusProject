import { FC } from "react";

interface IEditBusState {
	busState: { peopleOnBus: number; totalSeats: number };
	editBusState: {
		currentlyEditing: boolean;
		totalSeatsEditor: string;
		peopleOnBusEditor: string;
	};
	setEditBusState: React.Dispatch<
		React.SetStateAction<{
			currentlyEditing: boolean;
			totalSeatsEditor: string;
			peopleOnBusEditor: string;
		}>
	>;
	setBusState: React.Dispatch<
		React.SetStateAction<{
			peopleOnBus: number;
			totalSeats: number;
		}>
	>;
}

export const BusStateEditor: FC<IEditBusState> = ({
	busState,
	editBusState,
	setEditBusState,
	setBusState,
}) => {
	const { totalSeatsEditor, peopleOnBusEditor, currentlyEditing } = editBusState;
	const { peopleOnBus } = busState;

	const resetBusState = () => {
		setEditBusState({
			...editBusState,
			totalSeatsEditor: "",
			peopleOnBusEditor: "",
		});
	};

	return (
		<form>
			<input
				type="text"
				name="totalSeatsEditor"
				value={totalSeatsEditor}
				placeholder="Edit Total Seats"
				onChange={(e) => {
					let value = e.target.value;
					setEditBusState({
						...editBusState,
						totalSeatsEditor: value,
					});
				}}
			/>
			<input
				type="text"
				name="peopleOnBusEditor"
				placeholder="Edit People On Bus"
				value={peopleOnBusEditor}
				onChange={(e) => {
					let value = e.target.value;
					setEditBusState({
						...editBusState,
						peopleOnBusEditor: value,
					});
				}}
			/>
			<button
				onClick={(e) => {
					e.preventDefault();

					if (!/^\d+$/.test(totalSeatsEditor) || !/^\d+$/.test(peopleOnBusEditor)) {
						alert("Only numbers and make sure all fields entered.");
						resetBusState();
						return;
					}
					let seatsEditorAsNumber = parseInt(totalSeatsEditor);
					let peopleOnBusEditorAsNumber = parseInt(peopleOnBusEditor);

					if (seatsEditorAsNumber < peopleOnBus) {
						alert("Cannot make total seats less than people currently on bus.");
						resetBusState();
						return;
					}

					if (seatsEditorAsNumber < peopleOnBusEditorAsNumber) {
						alert("Cannot make total seats less than people on bus");
						resetBusState();
						return;
					}

					setBusState({
						...busState,
						peopleOnBus: peopleOnBusEditorAsNumber,
						totalSeats: seatsEditorAsNumber,
					});

					setEditBusState({
						...editBusState,
						currentlyEditing: !currentlyEditing,
					});
				}}>
				Confirm Change
			</button>
			<button
				onClick={() =>
					setEditBusState({
						...editBusState,
						currentlyEditing: !currentlyEditing,
					})
				}>
				Cancel
			</button>
		</form>
	);
};

export default BusStateEditor;
