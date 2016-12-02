const roleBuilder = require('role.builder');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');

module.exports = new class {
    constructor() {
        this.roles = {
            'builder': roleBuilder,
            'harvester': roleHarvester,
            'upgrader': roleUpgrader
        };

        this.roleLimits = {};

        let k;
        for (k in this.roles) {
            if (this.roles.hasOwnProperty(k)) {
                this.roleLimits[k] = this.roles[k].limit;
            }
        }
    }

    init() {

    };

    run() {

        let name;
        for (name in Memory.creeps) {
            if (Memory.creeps.hasOwnProperty(name)) {
                if (!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log('Clearing non-existing creep memory:', name);
                }
            }
        }

        let k;
        for (k in this.roles) {
            if (this.roles.hasOwnProperty(k)) {
                let roleCount = _.filter(Game.creeps, (creep) => creep.memory.role == k);
                console.log(k + ': ' + roleCount);

                if (roleCount < this.roles[k].limit) {
                    this.spawn(k, Game.spawns['Spawn1']); // Todo: Dynamic Spawns
                }
            }
        }

        for (name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                const creep = Game.creeps[name];
                if (creep.memory.role in this.roles) {
                    this.roles[creep.memory.role].run(creep);
                }
            }
        }
    };

    spawn(type, SpawnPoint) {
        if (type in this.roles) {
            this.roles[type].spawn(SpawnPoint);
        }
    }
};
