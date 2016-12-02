const harvest = require('action.harvest');
const upgrade = require('action.upgrade');

module.exports = class {
    actions = {
        'upgrade': upgrade,
        'harvest': harvest
    };

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