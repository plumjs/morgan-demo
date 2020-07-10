import express from 'express'
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'

var app = express()

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a',
})

// setup the logger
app.use(
  morgan(
    `[:date[iso]]
remote-addr: ":remote-addr"
remote-user: ":remote-user"
method: ":method"
url: ":url HTTP/:http-version"
status: ":status"
content: "res[content-length]"
referrer: ":referrer"
user-agent: ":user-agent"`,
    { stream: accessLogStream, immediate: false }
  )
)

app.get('/', function(req, res) {
  try {
    throw new Error('error occur')
  } catch (e) {
    res.json({
      code: -1,
      message: 'error occurs',
      detail: e,
    })
  }

  res.send('hello, world!')
})

app.listen(3000)
