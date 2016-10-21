

exports.message = (username, badgeCount, points) => {
  let message = `${username} has ${badgeCount} total badge(s) and ${points} points in javaScript`;
  console.log(message);
};

exports.error = (error) => {
    console.error(error);
};
