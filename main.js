const creepManager = require('manager.creep');
const towerManager = requre('manager.tower');

module.exports.loop = function () {
    creepManager.run();
    towerManager.run();
};