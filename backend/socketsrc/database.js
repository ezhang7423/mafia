const users = []; // empty array of users

const addUser = ({ id, name, room }) => {
  try {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
  } catch (e) {
    return { error: e };
  }
  const existingUser = users.find((user) => {
    // for each user in the array, check to see if
    // name and room is similar to the new user
    return user.room === room && user.name === name;
  });

  if (existingUser) {
    return { error: "Username is taken." };
  }

  const newUser = { id, name, room };
  users.push(newUser);
  rooms.add(room);
  return { user: newUser }; // returns the user object within an object
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  // find the user with id = id passed to function
  // return the new user array
  if (index !== -1) {
    return users.splice(index, 1)[0];
    // remove one element from index, returns the spliced user
  }
};

// return the user object with given id
const getUser = (id) => users.find((user) => user.id === id);

const getUserFromName = (name) => users.find((user) => user.name === name);

const getPlayerIndex = (name, room) => {
  for (let [i, x] of gamestates[room].players.entries()) {
    if (x.name === name) {
      return i;
    }
  }
};
// return array of users in the current room
const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

const rooms = new Set();
const gamestates = {}; // collection of gamestate, keys are rooms (different games)

module.exports = {
  users,
  getUserFromName,
  rooms,
  addUser,
  removeUser,
  getPlayerIndex,
  getUser,
  getUsersInRoom,
  gamestates,
  done: {},
  roomAmt: {},
};
