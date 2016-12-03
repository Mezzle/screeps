const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {

    constructor() {
        super();
        this.role = 'upgrader';

        this.limit = 1;
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
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        console.log(structure, structure.structureType);
                        return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
                    }
                }
            );

            if (target) {
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                this.actions.harvest(creep);
            }
        }
    }
};
