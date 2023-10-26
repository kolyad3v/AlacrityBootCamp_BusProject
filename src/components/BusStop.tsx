import React, { FC, useState } from 'react'
interface IBusStop {
	busState: { peopleOnBus: number; totalSeats: number }
	setBusState: React.Dispatch<
		React.SetStateAction<{
			peopleOnBus: number
			totalSeats: number
		}>
	>
	getAvailableSeats: () => number
}

const BusStop: FC<IBusStop> = ({
	busState,
	setBusState,
	getAvailableSeats,
}) => {
	const { peopleOnBus, totalSeats } = busState

	const [passengersWaitingAtBusStop, setPassengersWaitingAtBusStop] =
		useState<string>('')

	const [passengersGettingOffAtThisStop, setPassengersGettingOffAtThisStop] =
		useState<string>('')

	const setPassengerBusStopData = (atBusStop?: number): void => {
		setPassengersGettingOffAtThisStop('')

		setPassengersWaitingAtBusStop(atBusStop ? atBusStop.toString() : '')
	}

	const getPassengerDataAsNumber = (passengerData: string): number => {
		return passengerData === '' ? 0 : parseInt(passengerData)
	}

	const getPeopleRemainingOnBusAfterDisembarkment = (): number => {
		return (
			peopleOnBus - getPassengerDataAsNumber(passengersGettingOffAtThisStop)
		)
	}

	const updateStateAfterMorePassengersThanSeats = (
		passengers: number
	): void => {
		let passengersLeftOver = passengers - getAvailableSeats()
		setPassengerBusStopData(passengersLeftOver)
		setBusState({ ...busState, peopleOnBus: totalSeats })
	}

	const updateStateAfterLessPassengersThanSeats = (
		passengers: number
	): void => {
		let peopleOnBusAfterPassengersGetOn =
			getPeopleRemainingOnBusAfterDisembarkment() + passengers
		setBusState({ ...busState, peopleOnBus: peopleOnBusAfterPassengersGetOn })
	}

	const handlePassengerChangeOverOnBusArrival = (): void => {
		const passengersGettingOn = getPassengerDataAsNumber(
			passengersWaitingAtBusStop
		)
		const passengersGettingOff = getPassengerDataAsNumber(
			passengersGettingOffAtThisStop
		)

		if (passengersGettingOff > peopleOnBus) {
			alert('More people cannot get off than there are people on the bus')
			setPassengerBusStopData()
			return
		}

		if (
			getAvailableSeats() === 0 &&
			passengersGettingOff === 0 &&
			passengersGettingOn > 0
		) {
			alert('Aint no more room')
			return
		}

		if (passengersGettingOn > getAvailableSeats()) {
			updateStateAfterMorePassengersThanSeats(passengersGettingOn)
		} else {
			updateStateAfterLessPassengersThanSeats(passengersGettingOn)
			setPassengerBusStopData()
		}
	}

	return (
		<>
			<div className="card">
				<p>Bus Stop</p>
				<p>People waiting to get on: {passengersWaitingAtBusStop}</p>
				<input
					type="text"
					value={passengersWaitingAtBusStop}
					onChange={(e) => setPassengersWaitingAtBusStop(e.target.value)}
				/>

				<p>
					{peopleOnBus > 0
						? `People getting off at this stop: ${passengersGettingOffAtThisStop}`
						: `There isn't anyone on the bus...`}
				</p>
				<input
					type="text"
					max={peopleOnBus}
					value={passengersGettingOffAtThisStop}
					onChange={(e) => setPassengersGettingOffAtThisStop(e.target.value)}
				/>
				<button
					className="busStop_button"
					onClick={handlePassengerChangeOverOnBusArrival}
				>
					Handle Bus Arrival
				</button>
			</div>
		</>
	)
}

export default BusStop
