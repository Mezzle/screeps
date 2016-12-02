const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {

    constructor() {
        super();
        this.parts = [WORK, CARRY, MOVE];
        this.role = 'builder';
    }

    /** @param {Creep} creep **/
    run(creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if (creep.memory.building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            harvest(creep);
        }
    }
};