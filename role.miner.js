const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {
    constructor() {
        super();
        this.role = 'miner';

        this.limit = 5;
    }

    /** @param {Creep} creep **/
    run(creep) {
        let roles = {};
        for (let name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                let curCreep = Game.creeps[name];

                if (!(curCreep.memory.role in roles)) {
                    roles[curCreep.memory.role] = 1;
                } else {
                    roles[curCreep.memory.role]++;
                }
            }
        }

        if (!creep.memory.static && roles['miner'] <= roles['collector'] && ('collector' in creep.memory)) {
            creep.memory.static = true;
            creep.say('static');
        } else if (creep.memory.static && roles['miner'] > roles['collector'] && !('collector' in creep.memory)) {
            creep.memory.static = false;
            creep.say('self aware');
        }

        if (creep.memory.static) {
            this.actions.harvest(creep);
            if (creep.carry.energy) {
                creep.drop(RESOURCE_ENERGY, creep.carry.energy);
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