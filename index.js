const express = require('express')
const app = express()
const dotenv = require('dotenv')
const PORT = 5000
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')

dotenv.config()
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to mongoDB'))
  .catch((err) => console.log(err))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)

app.listen(PORT, () => {
  console.log(`Lama Dev API Server is running on port ${PORT}`)
})
