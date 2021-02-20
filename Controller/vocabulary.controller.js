const mongoose = require('mongoose')
const Vocabulary = mongoose.model('Vocabulary')
const helper = require('../helper.js')
const moment = require('moment')
const _ = require('lodash')

exports.create = async function (req, res) {
    const vocabulary = new Vocabulary(req.body)
    try{
        await vocabulary.save();
        res.status(200).send({ message: "Ok" })
    }catch{
        res.status(201).send({ message: err.message })
    }
  }

exports.listVocabulary = async (req, res) => {
    try{
    const vocabularys = await Vocabulary.find();
        return res.json(vocabularys)
    }catch{
        return res.status(404);    
    }
}