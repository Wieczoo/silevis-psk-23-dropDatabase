require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const routerTemplate = require('./routes/documentTemplates')
const routerCompanyInfo = require('./routes/companyInfo')
const routerInternship = require('./routes/InternshipRoute')
const routerApprenticeshipsDates = require('./routes/ApprenticeshipsDatesRoutes')
const app = express()



const port = 3001;

  app.use(express.json())


app.get('/hello', (req, res) => {
    res.send('Hello !')
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })


  // routes
app.use('/api/templates',routerTemplate )
app.use('/api',routerCompanyInfo )
app.use('/api/internship',routerInternship )
app.use('/api/ApprenticeshipsDates',routerApprenticeshipsDates)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    
  })
  .catch((err) => {
    console.log(err)
  })