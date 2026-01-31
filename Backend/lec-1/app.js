const express = require('express');

const app = express(); //created a server

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}); // server is live on port 3000