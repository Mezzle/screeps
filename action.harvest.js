module.exports =  function (creep) {

    const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    }
};