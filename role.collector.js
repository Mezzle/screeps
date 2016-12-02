const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {
    constructor() {
        super();
        this.parts = [CARRY, MOVE, MOVE];
        this.role = 'collector';

        this.limit = 1;
    }

    /** @param {Creep} creep **/
    run(creep) {
        const target = this.findTarget(creep);
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

    findTarget(creep) {
        let targetMiner;

        for (let name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                let checkCreep = Game.creeps[name];

                if (checkCreep.memory.collector) {
                    if (checkCreep.memory.collector = creep.name) {
                        targetMiner = checkCreep;
                        break;
                    }
                } else {
                    targetMiner = checkCreep;
                }
            }
        }

        if (targetMiner) {
            return creep.room.lookForAt(LOOK_RESOURCES, targetMiner.pos);
        }

        return false;
    }
};