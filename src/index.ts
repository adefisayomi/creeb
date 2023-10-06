import express from 'express'
import getPage from './controllers/geePage'
// import cookieParser from 'cookie-parser'

const app = express()


app.use('/', async (req, res) => {

   const data = await getPage()
   res.send(data)
})

app.listen(5000, () => console.log('server started: 5000'))