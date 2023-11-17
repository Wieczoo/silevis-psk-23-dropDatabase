require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');

const app = express()

const routerTemplate = require('./routes/documentTemplates')

const port = 3000

  app.use(express.json())


app.get('/hello', (req, res) => {
    res.send('Hello !')
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })


  // routes
app.use('/api',routerTemplate )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })