import { IBusState } from './types'

const getAvailableSeats = (busState: IBusState): number => {
	return busState.totalSeats - busState.peopleOnBus
}

describe('getAvailableSeats', () => {
	it('should return the correct number of available seats', () => {
		const busState = { peopleOnBus: 10, totalSeats: 20 }
		const availableSeats = getAvailableSeats(busState)
		expect(availableSeats).toBe(10)
	})

	it('should return 0 when the bus is full', () => {
		const busState = { peopleOnBus: 20, totalSeats: 20 }
		const availableSeats = getAvailableSeats(busState)
		expect(availableSeats).toBe(0)
	})

	it('should return the total number of seats when the bus is empty', () => {
		const busState = { peopleOnBus: 0, totalSeats: 20 }
		const availableSeats = getAvailableSeats(busState)
		expect(availableSeats).toBe(20)
	})
})
