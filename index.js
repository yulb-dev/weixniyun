const express = require('express')
const router = require('./router/router')
const app = express()

require('./model/connectDatabase')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)

const port = process.env.PORT || 80
app.listen(port, () => {
    console.log('服务启动成功，端口：', port)
})