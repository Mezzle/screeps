module.exports =  function (creep) {
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
};