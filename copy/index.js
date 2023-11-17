//variables for pdfs
var pdf = require("pdf-creator-node");
var fs = require('fs');
var html = fs.readFileSync('docs/test.html', 'utf8');

//express settings
const express = require('express')
    const app = express()
    const port = 3000

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
    name:"Jakub",
    surname:"Stępniewski",
    index: "91341"
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
    supervisorEmail: "piter@comayo.ok"
}  

var university ={
    supervisorName: "Karol",
    supervisorSurname: "Wieczorek",
    supervisorEmail: "karol@wieczorek.pl",
    supervisorTel: "123 456 789"
}

var apprenticeships ={
    startDate: "1.07.2023r",
    endDate: "31.07.2023r"
}

let date_ob = new Date();

    var document = {
    html: html,
    data: {
        student: student,
        cos: "siemano",
        date: date_ob.getDate()+"."+date_ob.getMonth()+"."+date_ob.getFullYear(),
        dean: "Roman Stanisław Deniziak",
        company: company,
        apprenticeships: apprenticeships,
        university: university
    },
    path: "./output.pdf"
    };

pdf.create(document, options)
    .then(res => {
    console.log(res)
    })
    .catch(error => {
    console.error(error)
    });

app.get('/download', function(req, res){

    pdf.create(document, options)
    .then(res => {
    console.log(res)
    })
    .catch(error => {
    console.error(error)
    });

    const file = `${__dirname}/output.pdf`;
    console.log("plik o sciezce: ",file)
    res.download(file); 
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })