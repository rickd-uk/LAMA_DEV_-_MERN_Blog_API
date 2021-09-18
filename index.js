const express = require('express')
const app = express()
const dotenv = require('dotenv')
const PORT = 5000
const mongoose = require('mongoose')
dotenv.config()

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to mongoDB'))
  .catch((err) => console.log(err))

app.listen(PORT, () => {
  console.log(`Lama Dev API Server is running on port ${PORT}`)
})
