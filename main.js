const roomManager = require('room.manager');
const creepManager = require('creep.manager');

module.exports.loop = function () {
    roomManager.init();

    let name;
    for (name in Memory.creeps) {
        if (Memory.creeps.hasOwnProperty(name)) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    if (harvesters.length < 2) {
        const newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }

    if (upgraders.length < 1) {
        const newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }

    creepManager.run();
};