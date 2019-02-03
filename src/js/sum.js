const sum = (...numbers) => {
	if (!numbers.length) return;
	return numbers.reduce((sum, current) => {
		return sum + current;
	}, 0);
};

export default sum;
