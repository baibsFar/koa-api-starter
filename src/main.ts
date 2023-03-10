import Koa from 'koa'
import logger from 'koa-logger'
import koaBodyParser from 'koa-bodyparser'
import http from 'http'
import dotenv from 'dotenv'
import { AppDataSource } from './data-source'
import { router } from './router/router'

dotenv.config()

export const app = new Koa()
const server = http.createServer(app.callback())
const port = parseInt(process.env.PORT as string)

app.use(logger())
app.use(koaBodyParser())
app.use(router.allowedMethods())
app.use(router.routes())

export async function main() {
  try {
    await AppDataSource.initialize()
    console.log('Database connection successfull.')
    server.listen(port, () => console.log(`Server listening on http://localhost:${port}`))
  } catch(e) { console.error(e) }
}