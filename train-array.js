
// reservedSeats will contain seat numbers and not seat indices
function reserveSeats_bestFit(numSeatsToBook, reservedSeats) {
	reservedSeats = reservedSeats.map(seatIndex => parseInt(seatIndex));

	const bestPossibleSeats = [];
	for (let row = 0; row < 11; row++) {
		const integerArray = Array.from(Array(7).keys())


		// false represents empty seat
		const row_seats = integerArray.map(elem => elem + 7 * row)
			.map(seatIndex => reservedSeats.indexOf(seatIndex + 1) > -1);


		// blocksOfSeats contains arrays containing continuous seatIndices 
		// example say seatIndex 2 is reserved
		// [[0,1], [3,4,5,6]]
		const blocksOfSeats = []


		let adjacentSeats = []
		row_seats.forEach((isReserved, index) => {
			if (!isReserved) {
				adjacentSeats.push(7 * row + index);
			} else {
				if (adjacentSeats.length > 0) blocksOfSeats.push(adjacentSeats);
				adjacentSeats = [];
			}
		})
		if (adjacentSeats.length > 0) blocksOfSeats.push(adjacentSeats)

		blocksOfSeats.forEach(adjacentSeats => {
			if (blocksOfSeats.length === 1 && blocksOfSeats[0].length === numSeatsToBook) bestPossibleSeats.push({ row, seats: adjacentSeats, isBestFit: true })
			else if (adjacentSeats.length >= numSeatsToBook) bestPossibleSeats.push({ row, seats: adjacentSeats, isBestFit: false })
		})
	}

	const bestFitSeats = bestPossibleSeats.filter(seatBlock => seatBlock.isBestFit);
	const remainingSeats = bestPossibleSeats.filter(seatBlock => !seatBlock.isBestFit);
	if (bestFitSeats.length > 0) {
		return bestFitSeats[0].seats;
	} else if (remainingSeats.length > 0) {
		return remainingSeats[0].seats.splice(0, numSeatsToBook);
	} else {
		return [];
	}
}

const reservedSeats = [1, 2, 3, 4, 5, 6, 7];
const returnedSeats = reserveSeats_bestFit(reservedSeats, 1)
console.log(returnedSeats)


module.exports = reserveSeats_bestFit;