module.exports = (creep) => {
    let ret = creep.upgradeController(creep.room.controller);
    if (ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    } else if (ret == ERR_NO_BODYPART) {
        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity);
                }
            }
        );

        let rett = creep.transfer(target, RESOURCE_ENERGY);
        if (rett == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            console.log('CANNOT DEPOSIT', creep.name, target);
        }
    }
};