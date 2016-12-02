const roomManager = require('room.manager');
const creepManager = require('creep.manager');

module.exports.loop = function () {
    roomManager.init();
    creepManager.run();
};