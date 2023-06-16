const userModel = require("../model/userModel");

const addUser = ({ id, user, room }) => {
    user = user.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!user || !room) {
        return { error: 'name and room required' };
    }

    return userModel.findOne({ user, room })
        .then((existingUser) => {
            if (existingUser) {
                return { error: 'user already exists' };
            }

            const newUser = new userModel({ id, user, room });
            return newUser.save()
                .then((response) => {
                    console.log('User saved:', response);
                    return { response };
                })
                .catch((error) => {
                    console.error('Error saving user:', error);
                    return { error: 'Failed to save user' };
                });
        })
        .catch((error) => {
            console.error('Error finding user:', error);
            return { error: 'Failed to find user' };
        });
};

module.exports = {
    addUser
}