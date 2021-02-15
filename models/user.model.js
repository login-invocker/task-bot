'use strict'

/**
 * Module dependencies.
 */
let mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const moment = require('moment')
const _ = require('lodash')
/**
 * A Validation function for local strategy properties
 */
const validateLocalStrategyProperty = function (property) {
  return (this.provider !== 'local' && !this.updated) || property.length
}

/**
 * A Validation function for local strategy password
 */
const validateLocalStrategyPassword = function (password) {
  return this.provider !== 'local' || (password && password.length > 6)
}

/**
 * User Schema
 */
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: '',
      validate: [validateLocalStrategyProperty, 'Chưa có tên'],
    },
    lastName: {
      type: String,
      trim: true,
      default: '',
      validate: [validateLocalStrategyProperty, 'Chưa có họ và đệm'],
    },
    displayName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
      validate: [validateLocalStrategyProperty, 'Chưa có địa chỉ email'],
      match: [/.+@.+\..+/, 'Địa chỉ email không hợp lệ'],
    },

    birthday: {
      type: Date,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    college: {
      type: String,
      // required: true,
    },
    graduationYear: {
      type: String,
      // required: true,
    },
    cellphone: {
      type: String,
      default: '',
      validate: [validateLocalStrategyProperty, 'Chưa có số điện thoại'],
    },
    oldCellphone: String,
    bankAccount: {
      bankName: String,
      bankBranch: String,
      accountNumber: String,
      holderName: String,
    },
    slackId: String,
    slack_id: String,
    wikiJsId: Number,
    scanId: String,
    username: {
      type: String,
      unique: 'testing error message',
      required: 'Please fill in a username',
      trim: true,
    },
    unixUpdated: {
      type: Number,
      default: () => moment().valueOf(),
    },
    code: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      default: '',
      validate: [validateLocalStrategyPassword, 'Password should be longer'],
    },
    images: [{ link: String, data: String, size: Number, dataBuffer: Array, imageType: String }],
    salt: {
      type: String,
    },
    provider: {
      type: String,
      required: 'Provider is required',
    },
    providerData: {},
    additionalProvidersData: {},
    roles: {
      type: [
        {
          type: String,
        },
      ],
      default: ['user'],
    },
    created: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    disabled: Date,
    /* For reset password */
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    jsonWebTokens: {
      type: [
        {
          tokenId: String,
          expired: Date,
          created: Date,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
)

UserSchema.pre('validate', function (next) {
  const user = this

  user.displayName = `${user.lastName} ${user.firstName}`
  next()
})

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  this.unixUpdated = moment().valueOf()

  const needNecessaryField =
    moment(_.get(this, 'created', moment())).isAfter('2020-02-14', 'day') &&
    !_.intersection(this.roles, ['outlet', 'deleted']).length
  if (needNecessaryField) {
    if (!this.birthday) {
      throw new Error('Chưa có ngày sinh')
    }
    // if (!this.address) {
    //   throw new Error('Chưa nhập hộ khẩu thường trú')
    // }
  }

  if (this.password && this.password.length > 6) {
    this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64')
    this.password = this.hashPassword(this.password)
  }

  next()
})

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    const salt = Buffer.from(this.salt, 'binary')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'SHA1')
    const str = hash.toString('base64')
    return str
  } else {
    return password
  }
}

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password)
}

UserSchema.methods.hasRole = function (role) {
  return this.roles.includes(role)
}

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
  const _this = this
  const possibleUsername = username + (suffix || '')

  _this.findOne(
    {
      username: possibleUsername,
    },
    function (err, user) {
      if (!err) {
        if (!user) {
          callback(possibleUsername)
        } else {
          return _this.findUniqueUsername(username, (suffix || 0) + 1, callback)
        }
      } else {
        callback(null)
      }
    }
  )
}

mongoose.model('User', UserSchema)
