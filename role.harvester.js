const roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            const sources = creep.room.find(FIND_SOURCES);

            let closestSource = {};
            const closestSourceDistance = 65535;

            for (source in sources) {
                if (sources.hasOwnProperty(source)) {
                    /** @param {Source} currentSource */
                    const currentSource = sources[source];

                    if (currentSource.pos.getRangeTo(creep.pos) < closestSourceDistance) {
                        closestSource = currentSource;
                    }
                }
            }
            if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource);
            }
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;