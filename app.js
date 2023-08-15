const express = require("express");
const data = require("./data");
const app = express();
const port = 3000;
app.use(express.json());

// Read all users
app.get("/users", (req, res) => {
  res.json(data);
});

// Read user by ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  data.forEach((user) => {
    if (user.id === userId) {
      res.send(user);
    }
  });
});

// Create a new user
app.post("/new-user", (req, res) => {
  const newUser = req.body;
  data.push(newUser);
  res.send(data);
});

// Update user by ID
app.put("/update-user/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const userIndex = data.findIndex((user) => user.id === userId);
  data[userIndex].id = updatedUser.id;
  data[userIndex].email = updatedUser.email;
  data[userIndex].password = updatedUser.password;
  res.send(data);
});

// Delete user by ID
app.delete("/delete-user/:id", (req, res) => {
  const userId = req.params.id;
  const newArray = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].id !== userId) {
      newArray.push(data[i]);
    }
  }
  res.send(newArray);
});

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});
