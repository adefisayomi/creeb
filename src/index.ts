import {config} from 'dotenv'
config()
import express from 'express'
import getPage from './controllers/geePage'
// import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 5000;


app.use('/', async (req, res) => {

   const data = await getPage()
   res.send(data)
})

app.listen(PORT, () => console.log('server started: ' + PORT))