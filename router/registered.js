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
    const { name, gender, introduction, avatar, id } = req.body
    User.findByIdAndUpdate(id, { name, gender, introduction, avatar }, (err, data) => {
        if (err) {
            res.send(err)
            return
        }
        else {
            res.send('ok')
        }
    })
})

router.post('/exit', (req, res) => {
    req.session.destroy()
    res.send(true)
})

router.post('/pushCard', (req, res) => {
    const { imgsrc, userid, title, labels, content } = req.body
    console.log({ imgsrc, userid, title, labels, content });
    // Card.create({ imgsrc, userid, title, labels, content }, (err, data) => {
    //     if (err) {
    //         res.send(err)
    //         return
    //     }
    //     User.findByIdAndUpdate(userid, { $push: { dynamic: data._id } }, (err, data2) => {
    //         res.send(data._id)
    //     })
    // })
})

router.post('/goEdit', (req, res) => {

})


module.exports = router