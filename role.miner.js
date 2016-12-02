const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {
    constructor() {
        super();
        this.parts = [WORK, CARRY, MOVE];
        this.role = 'miner';

        this.limit = 1;
    }

    /** @param {Creep} creep **/
    run(creep) {
        const collectors = Game.creeps.filter({memory: {role: 'collector'}}).length;
        const miners = Game.creeps.filter({memory: {role: 'miner'}}).length;

        if (miners == collectors) {
            this.actions.harvest(creep);
            if (creep.carry.energy) {
                creep.drop(RESOURCE_ENERGY);
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