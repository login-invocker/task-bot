const mongoose = require('mongoose')
const User = mongoose.model('User')
const helper = require('../helper.js')
const moment = require('moment')
const _ = require('lodash')
exports.create = async function (req, res) {
    const user = new User(req.body)
    user.provider = 'local'
    user.displayName = `${user.lastName} ${user.firstName}`

    user
      .save()
      .then(async (user) => {
        user.password = undefined
        user.salt = undefined

        res.jsonp(user)
      })
      .catch(err => {
        res.status(201).send({ message: err.message })
      })
  }


  exports.login = async (req, res) => {
    const { username, password, date } = req.body
    if (!username || !password) {
        loginError(res,'Chưa điền username và password')
    }
    const matchUser = await User.findOne({ username })
  
    if (!matchUser) {
        loginError(res,'Không có người dùng này trên hệ thống')
    }
  
    if (!matchUser.authenticate(password)) {
        loginError(res,'Mật khẩu không đúng')
    }
    res.jsonp({
      user: _.pick(matchUser.toObject(), ['firstName', 'lastName', 'email', 'displayName', '_id'])
    })
  }

  const loginError = (res, Error) => {
      return res.status(401).send({ message: Error })

  }
  