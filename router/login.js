const express = require('express')
const router = express.Router()
const User = require('../model/users')
const https = require('https')

router.get('/', (req, res) => {
    var params = new URLSearchParams({
        appid: 'wx224e9d3a79bf5e1f',
        secret: "f17a3a18bcc524419e2c10be947066ad",
        js_code: req.query.code,
        grant_type: "authorization_code"
    });
    let url = 'https://api.weixin.qq.com/sns/jscode2session?' + params
    https.get(url, (response) => {
        var body = '';

        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            var parsed = JSON.parse(body);
            res.send(parsed)
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