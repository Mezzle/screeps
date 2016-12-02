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
        const myMiners = _(Game.creeps).filter({memory: {role: 'miner', collector: creep.name}});

        if (myMiners.length > 0) {
            return creep.room.lookForAt(LOOK_RESOURCES, myMiners[0].pos);
        }

        const miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && !creep.memory.collector);

        if (miners.length > 0) {
            miners[0].memory.collector = creep.name;
            return creep.room.lookForAt(LOOK_RESOURCES, miners[0].pos);
        }

        return false;
    }
};