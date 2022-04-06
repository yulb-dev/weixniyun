const express = require('express')
const router = express.Router()
const User = require('../model/users')
const http = require('http')

router.get('/', (req, res) => {
    console.log(req.query);
    var params = new URLSearchParams({
        appid: 'wx224e9d3a79bf5e1f',
        secret: "f17a3a18bcc524419e2c10be947066ad",
        js_code: req.query.code,
        grant_type: "authorization_code"
    });
    let url = 'http://api.weixin.qq.com/sns/jscode2session?' + params
    http.get(url, (response) => {
        var body = '';

        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            res.send(body)
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