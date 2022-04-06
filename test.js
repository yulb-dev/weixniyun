const express = require('express')
const app = express()
const https = require('https')

app.get('/', (req, res) => {
    var params = new URLSearchParams({
        appid: 'wx224e9d3a79bf5e1f',
        secret: "f17a3a18bcc524419e2c10be947066ad",
        js_code: "003ucL000ZrICN1Gri1001zeWw0ucL0C",
        grant_type: "authorization_code"
    });
    let url = 'https://api.weixin.qq.com/sns/jscode2session?' + params
    console.log(url);
    https.get(url, (response) => {
        var body = '';

        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            console.log(body);
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
app.listen(3366, () => {
    console.log('服务启动成功，端口：', 3366)
})