const creepManager = require('manager.creep');
const towerManager = require('manager.tower');

module.exports.loop = function () {
    creepManager.run();
    towerManager.run();
};