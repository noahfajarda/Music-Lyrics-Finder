const express = require('express');
const app = express()
const PORT = 3001

// allow routes to read JSON data
app.use(express.json())
// import routes as middleware
app.use(require("./routes"))

// run server
app.listen(PORT, () => {
  console.log("server is running on", PORT)
  console.log(`Visit http://localhost:${PORT} to view`)
})