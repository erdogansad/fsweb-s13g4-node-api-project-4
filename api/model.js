const { nanoid } = require("nanoid");

const getId = () => nanoid(5);

let users = [
  { id: getId(), username: "OnrAgeNT", password: "$2a$08$CryXTCMQ9PrOvNkF.pZfHeHIeEFGiLlxffteITUGAL4Yx2hOxig3K", token: "" },
  { id: getId(), username: "NAUrjEHe", password: "$2a$08$fTbpwYZbeRFdon.UKW09M.YPsYDK5h7GcZPXpeIKvf0YndRNxVzDK", token: "" },
];

const find = () => Promise.resolve({ ...users.map((user) => ({ id: user.id, username: user.username })) });

const findByName = (username) => {
  let finder = users.find((user) => user.username === username);
  return Promise.resolve(finder);
};

const findToken = (token) => {
  return Promise.resolve(users.find((user) => user.token === token) ? true : false);
};

const insert = (data) => {
  let user = { id: getId(), ...data };
  users.push(user);
  return Promise.resolve({ id: user.id, username: user.username });
};

const update = (username, data) => {
  users.map((user) => {
    if (user.username === username) {
      for (let key in data) {
        user[key] = data[key];
      }
    }
  });
  return Promise.resolve(users.find((user) => user.username === username));
};

module.exports = {
  find,
  findByName,
  findToken,
  update,
  insert,
};
