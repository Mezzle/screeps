module.exports = {
  run: () => {
     for (roomName in Game.rooms) {
         if (Game.rooms.hasOwnProperty(roomName)) {
             let towers = Game.rooms[roomName].find(
                 FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

             towers.forEach(tower => tower.rep)
         }
     }
  }
};
