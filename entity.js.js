
let users = [{
    name: "vasanth"
}];

const addUser = ({ id, user, room }) => {

    user = user.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!user || !room) {
        return { error: 'name and room required' }
    }

    const existingUser = users.find(e => e.user === user && e.room === room);
    if (existingUser) {
        return { error: 'user already exists' };
    }

    const newUser = { id, user, room };
    users.push(newUser);

    console.log("users", users)


    return { response: newUser };
}

const getUser = (id) => {
    return users.find(e => e.id == id);
}

const getRoomUsers = (room) => {
    return users.filter(e => e.room === room)
}

const removeUser = (id) => {
    const findIdx = users.findIndex(e => e.id == id);

    if (findIdx >= 0) {
        return users.splice(findIdx, 1)[0]
    }
}
module.exports = {
    addUser,
    getUser,
    removeUser,
    getRoomUsers
}