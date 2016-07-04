let https = require('https');


let printMessage = (username, badgeCount, points) => {
  let message = `${username} has ${badgeCount} total badge(s) and ${points} points in javaScript`;
  console.log(message);
};

let printError = (error) => {
    console.error(error);
};

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
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch (error) {
          printError(error);
        }
      } else {
        printError(` Message: There was an error getting the profile for ${username} ${https.STATUS_CODES[response.statusCode]}` );
      }

    });
  });

  request.on('error', (error) => printError(error));
};

module.exports.get = get;
