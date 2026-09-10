
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample API Route
app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from the Express backend!" });
});

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
