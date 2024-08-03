const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/newuser', (req, res) => {
  const { userName, email, phoneNumber, address } = req.body;

  // Perform server-side validation if necessary
  if (!userName || !email || !phoneNumber || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Additional validation logic if needed

  // Save user to database (mock implementation)
  const newUser = { id: Date.now(), userName, email, phoneNumber, address };
  console.log('User created:', newUser);

  res.status(201).json({ message: 'User created successfully', user: newUser });
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
