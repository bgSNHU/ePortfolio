const app = require('./app');   //Imports app.js (Express server)

// Starts HTTP server, listens for response
app.listen(3000, () => console.log('Server running on port 3000'));