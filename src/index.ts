import {config} from 'dotenv'
config()
import express from 'express'
import getPage from './geePage'

const app = express()
const PORT = process.env.PORT || 5000;


app.use('/', async (req, res) => {

   const data = await getPage()
   res.send(data)
})

app.listen(PORT, () => console.log('server started: ' + PORT))