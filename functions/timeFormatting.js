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

function msToTimeString(ms) {
    if (ms <= 0) return 'less than a second'; // Handle non-positive durations

    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    let timeString = [];
    if (days > 0) timeString.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) timeString.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) timeString.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
    if (seconds > 0) timeString.push(`${seconds} sec${seconds > 1 ? 's' : ''}`);

    return timeString.join(' ') || 'less than a second'; // Fallback to 'less than a second' if empty
}

module.exports = { msToTimeString, timeDifferenceToString };