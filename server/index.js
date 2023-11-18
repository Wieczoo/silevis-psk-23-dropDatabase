require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const routerDocumentsText = require('./routes/documentsTextRoutes')
const routerCompanyInfo = require('./routes/companyInfo')
const routerInternship = require('./routes/InternshipRoute')
const routerApprenticeshipsDates = require('./routes/ApprenticeshipsDatesRoutes')
const routerInternshipDiary = require('./routes/InternshipDiaryRoutes')
const routerDocumentsTemplates = require('./routes/documentsTemplatesRoutes')
const routesHtmlText = require('./routes/htmlTextRoutes');
const routesUniversitySupervisor = require('./routes/UniversitySupervisor')
const app = express()
const cors = require('cors')


const port = 3001;

  app.use(express.json())
  var whitelist = ['http://localhost:8000', 'http://localhost:8080','http://localhost:3000','http://localhost:3001','http://localhost:3003']; //white list consumers
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
  };
  
  app.use(cors(corsOptions));

app.get('/hello', (req, res) => {
    res.send('Hello !')
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })


  // routes
app.use('/api/documentstext',routerDocumentsText )
app.use('/api',routerCompanyInfo )
app.use('/api/internship',routerInternship )
app.use('/api/apprenticeshipsdates',routerApprenticeshipsDates)
app.use('/api/internshipdiary',routerInternshipDiary);
app.use('/api/documentstemplates',routerDocumentsTemplates)
app.use('/api/htmltext',routesHtmlText)
app.use('/api/universitysupervisor',routesUniversitySupervisor)

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