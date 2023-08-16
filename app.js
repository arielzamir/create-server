const express = require("express");
let data = require("./data");
const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcrypt");
const e = require("express");
const app = express();
const port = 3000;
app.use(express.json());

// Read all users
app.get("/users", (req, res) => {
  res.json(data);
});

//Read user by ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  data.forEach((user) => {
    if (user.id === userId) {
      res.send(user);
    }
  });
});

//Create a new user
app.post("/new-user", (req, res) => {
  const saltRounds = 10;
  const newUser = {
    id: uuid4(),
    email: req.body.email,
    password: "",
  };
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      return res.status(500).json({ error: "Failed to hash password" });
    }
    newUser.password = hash;
    data.push(newUser);
    res.send(data);
  });
});

// // Update user by ID
app.put("/update-user/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const userIndex = data.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  data[userIndex].email = updatedUser.email;
  data[userIndex].password = updatedUser.password;

  res.send(data);
});

// // Delete user by ID
app.delete("/delete-user/:id", (req, res) => {
  const userId = req.params.id;
  let newData = data.filter((user) => user.id !== userId);
  data = newData;
  res.send(data);
});

//Stage 3
app.post("/check-user", (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const user1 = data.find((user) => user.email === userEmail);
  if (!user1) {
    return res.json(false);
  }
  const passwordMatch = bcrypt.compareSync(userPassword, user1.password);
  const user2 = data.find((user) => user.password === userPassword);
  if (passwordMatch || user2) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});
