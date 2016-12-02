const roleBuilder = require('role.builder');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');

module.exports = new class {
    constructor() {
        this.roles =  {
            'builder': roleBuilder,
            'harvester': roleHarvester,
            'upgrader': roleUpgrader
        };
    }

    init(){

    };

    run() {
        let name;
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
