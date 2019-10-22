var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keysyd8xwzUlDZ19U'}).base('appTFjZlkbQpQHWD2');

// Select Therapist 

// base('therapist').select({
//     // Selecting the first 3 records in Grid view:
//     maxRecords: 4,
//     view: "Grid view"
// }).eachPage(function page(records, fetchNextPage) {
//     // This function (`page`) will get called for each page of records.

//     records.forEach(function(record) {
//         console.log('Retrieved', record.get('full_name'));
//     });

//     // To fetch the next page of records, call `fetchNextPage`.
//     // If there are more records, `page` will get called again.
//     // If there are no more records, `done` will get called.
//     fetchNextPage();

// }, function done(err) {
//     if (err) { console.error(err); return; }
// });

module.exports = base('therapist').select({
    maxRecords: 4,
    view: 'Grid view'
}).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    records.forEach(function(record) {
        console.log('Retrieved', record.get('full_name'));
    });
});