import { FC } from 'react'

const BusStopSelector: FC<{
	numberOfBusStops: number
	setNumberOfBusStops: React.Dispatch<React.SetStateAction<number>>
}> = ({ numberOfBusStops, setNumberOfBusStops }) => {
	const editBusStopsNumber = (num: number): void => {
		let inc = (numberOfBusStops += num)
		setNumberOfBusStops(inc)
	}

	const curryedBusStopsNumber = (num: number) => () => {
		numberOfBusStops > 1 && setNumberOfBusStops((numberOfBusStops += num))
	}
	return (
		<div>
			<p>Number of Bus Stops:</p>
			<p>{numberOfBusStops}</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="2em"
				viewBox="0 0 384 512"
				onClick={() => editBusStopsNumber(1)}
			>
				<path
					fill="white"
					d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="2em"
				viewBox="0 0 384 512"
				fill="white"
				onClick={curryedBusStopsNumber(-1)}
			>
				<path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
			</svg>
		</div>
	)
}

export default BusStopSelector
