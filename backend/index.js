const express = require('express');
const connectDB = require('./db');


connectDB();



const app = express()
app.use(express.json())
const port = 3000
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})