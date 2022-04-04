const mongoose = require("mongoose")
mongoose.connect("mongodb://user59945536:Yu737534279@dds-f8z7roex6ws28nr5-pub.mongodb.rds.aliyuncs.com:3717/pictureblooms?authSource=admin", { useNewUrlParser: true, useUnifiedTopology: true }).then(data => { console.log('数据库连接成功') });
