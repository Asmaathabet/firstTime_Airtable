var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keysyd8xwzUlDZ19U'}).base('appTFjZlkbQpQHWD2');

base('therapist').find('recRsAX2xXQTzmcao', function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved Fields', record.fields);
    console.log('Retrieved Id', record.id);
});