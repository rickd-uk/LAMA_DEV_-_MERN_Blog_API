const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    })

    const user = await newUser.save()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    })

    if (!user) {
      res.status(400).json('wrong credentials')
    } else {
      const validated = await bcrypt.compare(req.body.password, user.password)

      if (!validated) {
        res.status(400).json('wrong credentials')
      } else {
        const { password, ...rest } = user._doc
        res.status(200).json(rest)
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
