const express = require('express');
const app = express();

// App Set //
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('server/public'));

app.listen(port, () => {
    console.log('Listening on port:', port);
  });
  