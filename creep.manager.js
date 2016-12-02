const roleBuilder = require('role.builder');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');

module.exports = {
    roles: {
        'builder': roleBuilder,
        'harvester': roleHarvester,
        'upgrader': roleUpgrader
    },
    init: () => {

    },
    run: () => {
        for (name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                const creep = Game.creeps[name];
                if (creep.memory.role in this.roles) {
                    this.roles[creep.memory.role].run(creep);
                }
            }
        }
    }
};
