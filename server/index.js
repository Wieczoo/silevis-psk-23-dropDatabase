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

var pdf = require("pdf-creator-node");
var fs = require('fs');


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

var options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    "body": {
        "height": "22mm",
        "contents": {
            first: 'Cover page',
            2: 'Second page', 
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', 
            last: 'Last Page'
        }
    }
}


var student = 
    {
    name:"Jan",
    surname:"Kowalski",
    index: "11111",
    adres: 'Miedziana 20, 25-670 Kielce',
    pesel: "021341",
    tel: "718 355 355",
    fieldOfStudy: "Informatyka",
    faculty: "faculty",
    formOfStudy: "Stacjonarne",
    year: 3
    }

var company ={
    name: "Comayo",
    city: "Kielce",
    streat: "Miedziana 20",
    krs: "1234",
    nip: "1234",
    regon: "1234",
    supervisorName: "Piotr",
    supervisorSurname: "Wieczorek",
    supervisorTel: "123 456 789",
    supervisorEmail: "piter@comayo.ok",
    zipCode: "25-670"
}  

var university ={
    supervisorName: "Karol",
    supervisorSurname: "Wieczorek",
    supervisorEmail: "karol@wieczorek.pl",
    supervisorTel: "123 456 789",
    supervisorFaculty: "Wydział elektrotrchniki, automatyki i informatyki"
}

var apprenticeships ={
    startDate: "1.07.2023r",
    endDate: "31.07.2023r"
}

var kierownik ={
    name: "Piotr",
    surname: "Wieczorek"
}


let date_ob = new Date();

const podanieOdbyteFunkcja = () => {
    var html = fs.readFileSync('docs/podanieOdbyte.html', 'utf8');

    var podanieOdbyte = {
        html: html,
        data: {
            student: student,
            date: date_ob.getDate()+"."+date_ob.getMonth()+"."+date_ob.getFullYear(),
            university: university,
            academicYear: "2022/2023",
            reason: "odbylem moje praktyki w terminie....",
            decision: "Wyrażam zgodę",
            companyAdres: "ul. Miedziana 20 Kielce",
            companyProfile: "IT",
            studetWorkstation: "mac",
            workTime: 160,
            studentDuty: "pażenie kawy",
            companySupervisorSurname: "Wieczorek",
            companySupervisorName: "Piotr",
            comments: "brak uwag",
 
        },
        path: "./pdfs/podanieOdbyte.pdf"
    }
    
    pdf.create(podanieOdbyte, options)
    .then(res => {
    console.log(res)
    })
    .catch(error => {
    console.error(error)
    });
}

const sprawozdanieFunkcja = () => {
    var html = fs.readFileSync('docs/sprawozdanie.html', 'utf8');

    var sprawozdanie = {
        html: html,
        data: {
            student: student,
            date: date_ob.getDate()+"."+date_ob.getMonth()+"."+date_ob.getFullYear(),
            company: company,
            apprenticeships: apprenticeships,
            university: university,
            kierownik: kierownik,
            opis: "Firma [nazwa firmy IT] specjalizuje się głównie w [opis głównej dziedziny działalności, np. tworzeniu oprogramowania, zarządzaniu systemami IT]. Zespół składa się z doświadczonych specjalistów, a firma słynie z innowacyjnych podejść do rozwiązywania problemów z zakresu technologii informatycznych.            "
        },
        path: "./pdfs/sprawozdanie.pdf"
    }
    
    pdf.create(sprawozdanie, options)
    .then(res => {
    console.log(res)
    })
    .catch(error => {
    console.error(error)
    });
}
    
const oswiadczenieFunkcja = () => {
    var html = fs.readFileSync('docs/oswiadczenie.html', 'utf8');

    var oswiadczenie = {
        html: html,
        data: {
            student: student,
            date: date_ob.getDate()+"."+date_ob.getMonth()+"."+date_ob.getFullYear(),
            company: company,
            apprenticeships: apprenticeships,
            university: university,
            kierownik: kierownik
        },
        path: "./pdfs/oswiadczenie.pdf"
    }
    
    pdf.create(oswiadczenie, options)
    .then(res => {
    console.log(res)
    })
    .catch(error => {
    console.error(error)
    });
}


const podanieFunkcja = () => {
    var html = fs.readFileSync('docs/podanie.html', 'utf8');

    var podanie = {
        html: html,
        data: {
            student: student,
            date: date_ob.getDate()+"."+date_ob.getMonth()+"."+date_ob.getFullYear(),
            company: company,
            apprenticeships: apprenticeships,
            university: university,
            kierownik: kierownik
        },
        path: "./pdfs/podanie.pdf"
    }
    
    pdf.create(podanie, options)
    .then(res => {
    console.log(res)
    })
    .catch(error => {
    console.error(error)
    });
}

const umowaFunkcja = () => {
    var html = fs.readFileSync('docs/umowaOOrganizacjePraktyk.html', 'utf8');

    var umowa = {
        html: html,
        data: {
            student: student,
            date: date_ob.getDate()+"."+date_ob.getMonth()+"."+date_ob.getFullYear(),
            dean: "Roman Stanisław Deniziak",
            company: company,
            apprenticeships: apprenticeships,
            university: university
        },
        path: "./pdfs/umowaOOrganizacjePraktyk.pdf"
    };
    
    pdf.create(umowa, options)
    .then(res => {
    console.log(res)
    })
    .catch(error => {
    console.error(error)
    });
}

umowaFunkcja()
podanieFunkcja()
oswiadczenieFunkcja()
sprawozdanieFunkcja()
podanieOdbyteFunkcja()


app.get('/download', function(req, res){

    pdf.create(document, options)
    .then(res => {
    console.log(res)
    })
    .catch(error => {
    console.error(error)
    });

    const file = `${__dirname}/pdfs/umowaOOrganizacjePraktyk.pdf`;
    console.log("plik o sciezce: ",file)
    res.download(file); 
  });
