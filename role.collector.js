const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {
    constructor() {
        super();
        this.role = 'collector';

        this.limit = 1;
    }

    /** @param {Creep} creep **/
    run(creep) {
        const target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
        if (creep.carry.energy < creep.carryCapacity && target) {
            if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            if (creep.carry.energy < creep.carryCapacity) {
                this.actions.harvest(creep);
            }
            else {
                this.actions.depositEnergy(creep);
            }
        }
    }
};