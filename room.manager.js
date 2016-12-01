const Room = require('room.model');

const RoomManager = {
    rooms: [],
    init: () => {
        for (room in Game.rooms) {
            if (Game.rooms.hasOwnProperty(room)) {
                RoomManager.rooms.push(new Room(Game.rooms[room]));
            }
        }
    }
};

module.exports = RoomManager;