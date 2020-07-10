import Koa from 'koa'
import fs from 'fs'
import morgan from 'koa-morgan'
import path from 'path'
const app = new Koa()

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
      user-agent: ":user-agent"
      response: ":response"`,
    { stream: accessLogStream, immediate: false }
  )
)

app.use((ctx, next: any) => {
  ctx.body = 'hello, world!'
})

app.listen(3000)
