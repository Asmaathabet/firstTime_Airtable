var Airtable = require('airtable');
var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('appTFjZlkbQpQHWD2');

module.exports = base('therapist').update([
  {
    "id": "recRsAX2xXQTzmcao",
    "fields": {
      "full_name": "abdallah said",
      "location": "palestine, gaza",
      "price_range": "30-50",
      "therapy_type": "cbt",
      "availability": "2:00-3:00 Saturday, Monday",
      "remote": true,
      "email": "abdallah@gmail.com",
      "password": "123456",
      "skype": "abdallah",
      "username": "abdallah",
      "is_valid": true,
      "image": [
        {
          "id": "attjv2pKNHEG8Xf5x"
        }
      ]
    }
  },
  {
    "id": "reciyIDNOyGIWsAEo",
    "fields": {
      "full_name": "hashem aa",
      "location": "palestine, gaza",
      "price_range": "10-20",
      "therapy_type": "fdg",
      "availability": "2:00-3:00  Tuesday",
      "remote": true,
      "email": "hashem@gmail.com",
      "password": "12344444",
      "skype": "hashem",
      "username": "hashem"
    }
  }
], function(err, records) {
  if (err) {
    console.error(err);
    return;
  }
  records.forEach(function(record) {
    console.log(record.get('availability'));
  });
});