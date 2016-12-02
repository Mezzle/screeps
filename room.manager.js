const Room = require('room.model');

const RoomManager = {
    rooms: [],
    init: () => {
        for (gameRoom in Game.rooms) {
            if (Game.rooms.hasOwnProperty(gameRoom)) {
                room = new Room(Game.rooms[gameRoom]);
                room.init();
                RoomManager.rooms.push(new Room(Game.rooms[gameRoom]));
            }
        }
    }
};

module.exports = RoomManager;