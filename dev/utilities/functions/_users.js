const { User } = require("../creators/createUser");

async function renderUserName(userId) {
  const users = await User.find();
  let responseMessage = "No User with this name/id";
  for (const user of users) {
    if (userId === user.userId) {
      responseMessage = `You are on ${user.firstName} page`;
      break;
    }
  }
  return responseMessage;
}

module.exports = { renderUserName };
