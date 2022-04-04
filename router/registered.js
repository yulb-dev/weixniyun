const express = require('express')
const router = express.Router()
const User = require('../model/users')
const Card = require('../model/goodsCard')
const Label = require('../model/labels')
const fs = require('fs')
const path = require('path')
//当前服务器 ip 地址
const port = require('./port')

router.post('/', (req, res) => {
  
})

router.post('/setUp', (req, res) => {

})

router.post('/exit', (req, res) => {
    req.session.destroy()
    res.send(true)
})

router.post('/pushCard', (req, res) => {
   
})

router.post('/goEdit', (req, res) => {
   
})


module.exports = router