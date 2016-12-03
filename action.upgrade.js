module.exports = (creep) => {
    let ret = creep.upgradeController(creep.room.controller);
    if (ret == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    } else if (ret == ERR_NO_BODYPART) {

        //console.log(creep.room.find(FIND_STRUCTURES));

        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    console.log(structure, structure.structureType);
                    return (structure.structureType == STRUCTURE_CONTAINER && _.sum(structure.store) < structure.storeCapacity);
                }
            }
        );

//console.log('Target', target);


        let rett = creep.transfer(target, RESOURCE_ENERGY);
        if (rett == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            console.log('CANNOT DEPOSIT', creep.name, target);
        }
    }
};