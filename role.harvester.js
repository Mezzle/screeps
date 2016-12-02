const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {
    parts = [WORK, CARRY, MOVE];
    role: 'harvester';

    run(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            actions.harvest(creep);
        }
        else {
            actions.upgrade(creep);
        }
    }
};