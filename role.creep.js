const harvest = require('action.harvest');
const upgrade = require('action.upgrade');
const depositEnergy = require('action.depositenergy');

module.exports = class {
    constructor() {
        this.actions = {
            'upgrade': upgrade,
            'harvest': harvest,
            'depositEnergy': depositEnergy
        };

        this.limit = 1;
    }

    /**
     * spawn
     *
     * @param {Spawn} spawnPoint
     */
    spawn(spawnPoint) {
        const newName = spawnPoint.createCreep(this.parts, undefined, {role: this.role});
        console.log('Spawning new ' + this.role + ': ' + newName);
    }
};