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
    Card.create({ imgsrc, userid, title, labels, content }, (err, data) => {
        if (err) {
            res.send(err)
            return
        }
        for (let i = 0; i < labels.length; i++) {
            labels[i] = {
                value: labels[i]
            }
        }
        Label.create(labels, (err, data) => {
            if (err) {
                return
            }
        })
        User.findByIdAndUpdate(userid, { $push: { dynamic: data._id } }, (err, data2) => {
            if (err) {
                res.send(err)
                return
            }
            res.send(data._id)
        })
    })
})

router.post('/editCard', (req, res) => {
    const { imgsrc, userid, title, labels, content, cardId } = req.body
    Card.findByIdAndUpdate(cardId, { imgsrc, userid, title, labels, content }, (err, data) => {
        if (err) {
            return
        }
        res.send(data)
    })
})


module.exports = router