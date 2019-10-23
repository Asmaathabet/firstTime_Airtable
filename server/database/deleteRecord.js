var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keysyd8xwzUlDZ19U'}).base('appTFjZlkbQpQHWD2');

base('therapist').destroy(['recRsAX2xXQTzmcao', 'reciyIDNOyGIWsAEo'], function(err, deletedRecords) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Deleted', deletedRecords.length, 'records');
});