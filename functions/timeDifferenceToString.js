function timeDifferenceToString(pastDate, now = new Date()) {
	const differenceInMilliseconds = now.getTime() - pastDate.getTime();
  
	const units = [
	  { value: 31536000000, label: 'year' }, // Milliseconds in a year (adjusted for leap years)
	  { value: 2592000000, label: 'month' }, // Milliseconds in a month (average)
	  { value: 604800000, label: 'week' },  // Milliseconds in a week
	  { value: 86400000, label: 'day' },   // Milliseconds in a day
	  { value: 3600000, label: 'hour' },   // Milliseconds in an hour
	  { value: 60000, label: 'minute' },   // Milliseconds in a minute
	  { value: 1000, label: 'second' },    // Milliseconds in a second
	];
  
	// Find the largest unit that fits the difference
	let largestUnit = units.find((unit) => differenceInMilliseconds >= unit.value);
  
	// Calculate the time difference in the chosen unit
	const difference = Math.floor(differenceInMilliseconds / largestUnit.value);

	// Plural handling and alert postfix
	const postfix = (difference > 1) ? "s" : "";
	const highlight = (largestUnit.label === 'hour' || largestUnit.label === 'minute' || largestUnit.label === 'second') ? "🚨" : "";
  
	return `${difference} ${largestUnit.label}${postfix}${highlight}`;
}

module.exports = timeDifferenceToString;