'use strict'

/**
 * Module dependencies.
 */
let mongoose = require('mongoose')
const Schema = mongoose.Schema
const _ = require('lodash')
/**
 * Vocabulary Schema
 */
const VocabularySchema = new Schema(
    {
    english: String,
    vietnamese: String,
    example: String,
    date: {
      type: Date,
      default: new Date()
    }
  })


mongoose.model('Vocabulary', VocabularySchema)
