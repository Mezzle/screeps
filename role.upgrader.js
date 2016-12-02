const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {

    constructor() {
        super();
        this.parts = [WORK, CARRY, MOVE];
        this.role = 'upgrader';

        this.limit = 2;
    }

    /** @param {Creep} creep **/
    run(creep) {
        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }

        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.memory.upgrading) {
            this.actions.upgrade(creep);
        }
        else {
            this.actions.harvest(creep);
        }
    }
};
