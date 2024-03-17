function timeDifferenceToString(pastDate, now = new Date()) {
	const differenceInMilliseconds = now.getTime() - pastDate.getTime();
  
	const units = [
	  { value: 31536000000, label: 'years' }, // Milliseconds in a year (adjusted for leap years)
	  { value: 2592000000, label: 'months ' }, // Milliseconds in a month (average)
	  { value: 604800000, label: 'weeks' },  // Milliseconds in a week
	  { value: 86400000, label: 'days' },   // Milliseconds in a day
	  { value: 3600000, label: 'hours' },   // Milliseconds in an hour
	  { value: 60000, label: 'minutes 🚨' },   // Milliseconds in a minute
	  { value: 1000, label: 'seconds 🚨' },    // Milliseconds in a second
	];
  
	// Find the largest unit that fits the difference
	let largestUnit = units.find((unit) => differenceInMilliseconds >= unit.value);
  
	// Calculate the time difference in the chosen unit
	const difference = Math.floor(differenceInMilliseconds / largestUnit.value);
	
	return `${difference} ${largestUnit.label}`;
  }

  module.exports = timeDifferenceToString;