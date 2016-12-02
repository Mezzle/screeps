const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {
    constructor() {
        super();
        this.parts = [WORK, CARRY, MOVE];
        this.role = 'harvester';

        this.limit = 2;
    }

    /** @param {Creep} creep **/
    run(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            this.actions.harvest(creep);
        }
        else {
            this.actions.depositEnergy(creep);
        }
    }
};