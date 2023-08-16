const { v4: uuid4 } = require("uuid");

const array = [
  {
    id: uuid4(),
    email: "someone1@gmail.com",
    password: "1234",
  },
  {
    id: uuid4(),
    email: "someone2@gmail.com",
    password: "123456",
  },
  {
    id: uuid4(),
    email: "someone3@gmail.com",
    password: "12345678",
  },
];

module.exports = array;
