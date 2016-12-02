const BaseCreep = require('role.creep');

class Harvester extends BaseCreep {
    constructor() {
        super();
        this.parts = [WORK, CARRY, MOVE];
        this.role = 'harvester';

        this.limit = 2;
    }


    run(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            this.actions.harvest(creep);
        }
        else {
            this.actions.upgrade(creep);
        }
    }
}

module.exports = new Harvester;