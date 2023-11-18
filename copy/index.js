//variables for pdfs
var pdf = require("pdf-creator-node");
var fs = require('fs');


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
    index: "91341",
    adres: 'Miedziana 20, 25-670 Kielce',
    pesel: "021341",
    tel: "718 355 355",
    fieldOfStudy: "Informatyka",
    faculty: "Wydział elektrotrchniki, automatyki i informatyki",
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

    const file = `${__dirname}/pdfs/umowaOOrganizacjePraktyk.pdf`;
    console.log("plik o sciezce: ",file)
    res.download(file); 
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })