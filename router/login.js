const express = require('express')
const router = express.Router()
const User = require('../model/users')
const http = require('http')
const sha1 = require('sha1')

router.post('/', (req, res) => {
    const { name, avatar, code } = req.body
    console.log(name, avatar, code);
    var params = new URLSearchParams({
        appid: 'wx224e9d3a79bf5e1f',
        secret: "f17a3a18bcc524419e2c10be947066ad",
        js_code: code,
        grant_type: "authorization_code"
    });
    let url = 'http://api.weixin.qq.com/sns/jscode2session?' + params
    //小程序云托管需要配置开放接口
    http.get(url, (response) => {
        var body = '';

        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            let { openid } = JSON.parse(body)
            openid = sha1(openid)
            User.findOne({ openid }, (err, data) => {
                if (err) {
                    res.send(err)
                } else if (data) {
                    //更新用户信息
                    User.findByIdAndUpdate(data._id, { name, avatar }, (err, data) => {
                        if (err) {
                            res.send(err)
                            return
                        }
                        res.send(data)
                    })
                } else {
                    //创建用户
                    User.create({ name, avatar, openid }, (err, data) => {
                        if (err) {
                            res.send(err)
                            return
                        }
                        res.send(data)
                    })
                }
            })
            res.send(token)
        });
    })
    // User.findOne(req.body, (err, data) => {
    //     if (err) {
    //         res.send(err)
    //         return
    //     }
    //     if (data) {
    //         req.session.userid = data._id
    //     }
    //     res.send(data)
    // })

    

})
module.exports = router