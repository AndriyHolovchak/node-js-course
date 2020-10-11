const fs = require('fs').promises;
const path = require('path');

const convertCSVToJSON = (str, delimiter = ';') => {
	const titles = str.slice(0, str.indexOf('\n')).trim().split(delimiter);
	const rows = str.slice(str.indexOf('\n') + 1).split('\n');
	return rows.map((row) => {
		const values = row.split(delimiter);
		return titles.reduce(
			(object, curr, i) => ((object[curr] = values[i].trim()), object),
			{},
		);
	});
};

const getEventsJson = async (fileName) => {
	const result = await fs.readFile(fileName);
	return convertCSVToJSON(result.toString());
};

function transformEventsToCsv(events) {
	const lineSeparator = '\n';
	const headers = 'id;title;location;date;hour';
	const data = events.map(
		(item) =>
			`${item.id};${item.title};${item.location};${item.date};${item.hour}`,
	);
	return `${headers}${lineSeparator}${data.join(lineSeparator)}`;
}

const addNewEvent = async (fileName, existingEvents, event) => {
	const filePath = path.join('.', fileName);
	const events = [...existingEvents, event];
	await fs.writeFile(filePath, transformEventsToCsv(events));
};

const updateEvent = async (fileName, id, existingEvents, eventData) => {
	const filePath = path.join('.', fileName);

	const events = existingEvents.map((event) =>
		id === event.id ? { id, ...eventData } : event,
	);

	await fs.writeFile(filePath, transformEventsToCsv(events));
};

module.exports.getEventsJson = getEventsJson;
module.exports.addNewEvent = addNewEvent;
module.exports.updateEvent = updateEvent;
module.exports.convertCSVToJSON = convertCSVToJSON;
