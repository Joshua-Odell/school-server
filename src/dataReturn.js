const fs = require('fs');

const csv = require('fast-csv');

const ws = fs.createWriteStream('data-return.csv', { flags: 'a' });

async function dataReturn(data) {
	csv.write([data], { headers: true }).pipe(ws);
}

module.exports = dataReturn;
