let https = require('https');
let print = require('./printer');

let get = (username) => {

  // Connect to treehouse API URL(http://teamtreehouse.com/username.json);
  let request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
    console.log(` Server response status code: ${response.statusCode}`);
    let body = '';
    response.on('data', (chunk) => {
      body += chunk;
    });
    response.on('end', () => {
      if (response.statusCode === 200) {
        try {
          let profile =  JSON.parse(body);
          print.message(username, profile.badges.length, profile.points.JavaScript);
        } catch (error) {
          print.error(error);
        }
      } else {
        print.error(` Message: There was an error getting the profile for ${username} ${https.STATUS_CODES[response.statusCode]}` );
      }

    });
  });

  request.on('error', (error) => print.error(error));
};

module.exports.get = get;
