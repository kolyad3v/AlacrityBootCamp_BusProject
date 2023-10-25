export interface IBusStateEditor {
	currentlyEditing: boolean;
	totalSeatsEditor: string;
	peopleOnBusEditor: string;
}

export interface IBusState {
    peopleOnBus: number;
		totalSeats: number;
}