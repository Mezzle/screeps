const Room = require('room.model=');

const RoomManager = {
    rooms: [],
    init: () => {
        Game.rooms.forEach((room) => {
            rooms.push(new Room(room));
        })
    }
};

module.exports = RoomManager;