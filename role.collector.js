const BaseCreep = require('role.creep');

module.exports = new class extends BaseCreep {
    constructor() {
        super();
        this.parts = [CARRY, CARRY, MOVE, MOVE];
        this.role = 'collector';

        this.limit = 5;
    }

    /** @param {Creep} creep **/
    run(creep) {
        const target = this.findTarget(creep);

        if (creep.carry.energy >= creep.carryCapacity) {
            this.actions.depositEnergy(creep);
        } else if (target) {
            if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            this.actions.depositEnergy(creep);
        }
    }

    findTarget(creep) {
        let target;
        if (creep.memory.resourcepile) {
            let target = Game.getObjectById(creep.memory.resourcepile);

            if (target) {
                return target;
            }
        }

        let targetMiner;

        for (let name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                let checkCreep = Game.creeps[name];

                if (checkCreep.memory.role == 'miner') {
                    if ('collector' in checkCreep.memory) {
                        if (checkCreep.memory.collector == creep.name) {
                            targetMiner = checkCreep;
                            break;
                        }
                    } else {
                        targetMiner = checkCreep;
                    }
                }
            }
        }

        if (targetMiner) {
            if (!('collector' in targetMiner.memory)) {
                targetMiner.memory.collector = creep.name;
                creep.say(targetMiner.name);
            }

            target = creep.room.lookForAt(LOOK_ENERGY, targetMiner.pos)[0];
            if (target) {
                creep.memory.resourcepile = target.id;
                return target;
            }
        }

        target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
        if (target) {
            creep.memory.resourcepile = target.id;
        }
        return target;
    }
};