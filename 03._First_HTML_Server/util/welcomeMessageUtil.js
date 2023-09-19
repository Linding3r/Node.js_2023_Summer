const welcomeMessageJson = require('./welcomeMessage.json');

function getWelcomeMessage(userName) {
    if (!userName) {
        return welcomeMessageJson.noNameWelcomeMessage;
    } else {
        return welcomeMessageJson.nameWelcomeMessage.replace('$userName', userName);
    }
}

module.exports = {
    getWelcomeMessage,
};
