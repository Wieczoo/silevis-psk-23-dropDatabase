import '../styles/form.css';

import React, { useRef, useEffect, useState, useContext } from 'react';

import axios from 'axios';
import icon_close from '../assets/icons/close.png';
import store from '../utils/store';

const Form = () => {
  const mojDivRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState('');

  const [temporaryData,setTemporaryData] = useState();



  const {closeForm} = useContext(store);
  


  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    index: '',
    university: {
        supervisorName: '',
        supervisorSurname: '',
        supervisorEmail: '',
        supervisorTel: '',
        dean: '',
    },
    company: {
      name: '',
      city: '',
      street: '',
      krs: '',
      nip: '',
      regon: '',
      supervisorName: '',
      supervisorSurname: '',
      supervisorEmail: '',
      supervisorTel: '',
    },
    startDate: '',
    endDate: '',
  });

const fetchData = async (nip) => {
    try {
      const response = await axios.get('http://10.5.5.188:3001/api/companyinfo/'+nip);
      const adres = response.data.result.subject.residenceAddress.split(',')

      setFormData(prevFormData => ({
        ...prevFormData,
        company: {
          ...prevFormData.company,
          name: response.data.result.subject.name,
          city: adres[1].substring(7),
          street: adres[0],
          krs: response.data.result.subject.krs,
          regon: response.data.result.subject.regon,
        },
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUniversityChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      university: {
        ...prevData.university,
        [name]: value,
      },
    }));
  };

  const handleNip = (e) =>{
    setFormData(formData.company)
  }

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      company: {
        ...prevData.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz przekazać dane do innej funkcji lub komponentu, aby je obsłużyć
    console.log('Wysyłanie danych:', formData);
  };


  useEffect(() => {
    console.log(formData.company.nip.length)
    if(formData.company.nip.length === 10){
        const companyInfo = fetchData(formData.company.nip)
        console.log(companyInfo.name)
        
    }
  }, [formData.company.nip]);
  

  useEffect(() => {


    axios.get('http://10.5.5.188:3001/api/htmltext')
    .then((response) => {
        console.log(response.data);
        setTemporaryData(response.data);
        
    })
    .catch((err) => {console.log(err)});
    const currentDateObj = new Date();
    const day = currentDateObj.getDate();
    const month = currentDateObj.getMonth() + 1;
    const year = currentDateObj.getFullYear();

    const currentDate = day+"."+month+"."+year+"r."
    const html2 = temporaryData
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Zarz_R_54_19_zal_1</title>
      </head>
      <body>
      <div style="margin: 1vw">
        <p style="font-size: 0.4vw; text-align: right; margin-bottom: 0.5vw; margin-top: 2vw;">
            <b>Załącznik nr 1 do Zarządzenia Nr 54/19<br>
            Rektora Politechniki Świętokrzyskiej z dnia 20 września 2019 r.</b>
        </p>
        <p style="text-align: center; font-size: 0.7vw; line-height: 2;">
            <b>Umowa<br>
            o organizację praktyki studenta Politechniki Świętokrzyskiej</b>
        </p>
        <p style="font-size: 0.6vw; line-height: 2;">
            zawarta w dniu <b>${currentDate}</b> r. pomiędzy:
            <b>Politechniką Świętokrzyską</b> al. Tysiąclecia Państwa Polskiego 7, 25-314 Kielce,
            zwaną dalej <b>Uczelnią</b>, reprezentowaną na podstawie udzielonego przez Rektora Uczelni
            pełnomocnictwa, przez Dziekana Wydziału <b>${formData.university.dean}</b> ,<br>
            a<br>
            <b>${formData.company.name}</b> z siedzibą w <b>${formData.company.city}</b> ul. <b>${formData.company.street}</b>
            o nr KRS <b>${formData.company.krs}</b> NIP <b>${formData.company.nip}</b> Regon <b>${formData.company.regon}</b> zwanym dalej
            <b>Zakładem</b> lub <b>Zakładem Pracy</b>, reprezentowanym przez <b>${formData.company.supervisorName} ${formData.company.supervisorSurname}</b>
        </p>
    
        <p style="font-size: 0.6vw; line-height: 2; margin-bottom: 4vw;">
            § 1. Uczelnia kieruje studenta <b>${formData.name} ${formData.surname}</b> nr albumu <b>${formData.index}</b>
            do Zakładu w celu odbycia przez niego praktyki studenckiej w okresie 
            od <b>${formData.startDate}</b> do <b>${formData.endDate}</b><br>
            § 2. Zakład zobowiązuje się do:<br>
            1&#41; zapewnienia odpowiednich stanowisk pracy, pomieszczeń, warsztatów, urządzeń, narzędzi i materiałów zgodnie z programem praktyki stanowiącym załącznik nr 1 do niniejszej umowy;<br>
            2&#41; zapoznania studenta z zakładowym regulaminem pracy, przepisami o bezpieczeństwie i higienie pracy oraz o ochronie danych/tajemnicy przedsiębiorstwa itp. obowiązujących w Zakładzie;<br>
            3&#41; nadzoru nad wykonaniem przez studenta zadań wynikających z programu praktyki.<br>
            § 3. Uczelnia zobowiązuje się do sprawowania kierownictwa dydaktycznego nad praktyką studencką oraz jej kontroli i oceny, zgodnie z programem praktyk.<br>
            § 4. W przypadku gdy Zakład zdecyduje o możliwości przyznania studentowi wynagrodzenia z tytułu pracy wykonywanej w trakcie odbywania praktyki, stosowna umowa zawierana jest pomiędzy Zakładem a studentem, bez udziału i pośrednictwa Uczelni.<br>
        </p>
        <p style="font-size: 0.6vw; line-height: 2;">
            § 5. 1. Strony wyznaczają osoby właściwe do kontaktu w bieżących sprawach:<br>
            1&#41; z ramienia Zakładu Pracy <b> ${formData.company.supervisorName} ${formData.company.supervisorSurname} </b><br>
            tel.: <b>${formData.company.supervisorTel}</b><br>
            e-mail: <b>${formData.company.supervisorEmail}</b><br>
           
            2&#41; z ramienia Uczelni: <b>${formData.university.supervisorName} ${formData.university.supervisorSurname} </b><br>
            tel.: <b>${formData.university.supervisorTel}</b><br>
            e-mail: <b>${formData.university.supervisorEmail}</b><br>
    
            2. Klauzula informacyjna dotycząca przetwarzania przez Uczelnię danych osobowych pozyskanych z Zakładu stanowi załącznik nr 2 do niniejszej umowy. Zakład zobowiązuje się do udostępnienia załącznika osobom, których dane przekazano na podstawie niniejszej umowy.<br>
            § 6. Umowa niniejsza została sporządzona w dwóch jednobrzmiących egzemplarzach po jednym dla każdej ze Stron.<br>
            § 7. Ewentualne spory mogące wyniknąć na tle stosowania niniejszej umowy będą rozstrzygane na zasadzie mediacji przez wytypowanych przez każdą ze Stron mediatorów.<br>
            § 8. Umowa została zawarta na czas odbywania przez studenta praktyki określony w § 1.<br>
        </p>
        <div style="width: 50%; float: left; text-align: center; font-size: 0.5vw; margin-top: 1.8vw;">
            <p><b>W imieniu Zakładu</b></p>
            <p style="margin-top: 2.5vw;">.......................................................................</p>
            <p style="font-size: 0.4vw;"><b>podpis i pieczęć</b></p>
        </div>
        <div style="width: 50%; float: left; text-align: center; font-size:  0.5vw; margin-top: 1.8vw; margin-bottom: 1vw;">
            <p><b>W imieniu Politechnikai Świętokrzyskiej</b></p>
            <p style="margin-top: 2.5vw;">.......................................................................</p>
            <p style="font-size: 0.4vw;"><b>podpis i pieczęć</b></p>
        </div>
        </div>
        
      </body>
    </html>
    `;

    setHtmlContent(html2);
  }, [formData]);

  return (
    <div id='formBg'>
      <div id="formView">
        <div>
          <div>titel</div>
          <div id='formInputs' ref={mojDivRef}>
          <div>
      <h2>Formularz</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Imię:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="surname">Nazwisko:</label>
        <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />

        <label htmlFor="index">Numer indeksu:</label>
        <input type="text" id="index" name="index" value={formData.index} onChange={handleChange} required />

        <label htmlFor="supervisorName">Imię opiekuna uniwersytetu:</label>
        <input
          type="text"
          id="supervisorName"
          name="supervisorName"
          value={formData.university.supervisorName}
          onChange={handleUniversityChange}
          required
        />

        <label htmlFor="supervisorSurname">Nazwisko opiekuna uniwersytetu:</label>
        <input
          type="text"
          id="supervisorSurname"
          name="supervisorSurname"
          value={formData.university.supervisorSurname}
          onChange={handleUniversityChange}
          required
        />

        <label htmlFor="supervisorEmail">Email opiekuna uniwersytetu:</label>
        <input
          type="email"
          id="supervisorEmail"
          name="supervisorEmail"
          value={formData.university.supervisorEmail}
          onChange={handleUniversityChange}
          required
        />

        <label htmlFor="supervisorTel">Telefon opiekuna uniwersytetu:</label>
        <input
          type="tel"
          id="supervisorTel"
          name="supervisorTel"
          value={formData.university.supervisorTel}
          onChange={handleUniversityChange}
          required
        />

        <label htmlFor="dean">Dziekan uniwersytetu:</label>
        <input type="text" id="dean" name="dean" value={formData.university.dean} onChange={handleUniversityChange} required />

        <label htmlFor="companyName">Nazwa firmy:</label>
        <input type="text" id="companyName" name="name" value={formData.company.name} onChange={handleCompanyChange} required />

        <label htmlFor="companyCity">Miasto firmy:</label>
        <input type="text" id="companyCity" name="city" value={formData.company.city} onChange={handleCompanyChange} required />

        <label htmlFor="companyStreet">Ulica firmy:</label>
        <input type="text" id="companyStreet" name="street" value={formData.company.street} onChange={handleCompanyChange} required />

        <label htmlFor="companyKRS">Numer KRS firmy:</label>
        <input type="text" id="companyKRS" name="krs" value={formData.company.krs} onChange={handleCompanyChange} required />

        <label htmlFor="companyNIP">Numer NIP firmy:</label>
        <input type="text" id="companyNIP" name="nip" value={formData.company.nip} onChange={handleCompanyChange} required />

        <label htmlFor="companyRegon">Numer REGON firmy:</label>
        <input type="text" id="companyRegon" name="regon" value={formData.company.regon} onChange={handleCompanyChange} required />

        <label htmlFor="companySupervisorName">Imię opiekuna firmy:</label>
        <input
          type="text"
          id="companySupervisorName"
          name="supervisorName"
          value={formData.company.supervisorName}
          onChange={handleCompanyChange}
          required
        />

        <label htmlFor="companySupervisorSurname">Nazwisko opiekuna firmy:</label>
        <input
          type="text"
          id="companySupervisorSurname"
          name="supervisorSurname"
          value={formData.company.supervisorSurname}
          onChange={handleCompanyChange}
          required
        />

        <label htmlFor="companySupervisorEmail">Email opiekuna firmy:</label>
        <input
          type="email"
          id="companySupervisorEmail"
          name="supervisorEmail"
          value={formData.company.supervisorEmail}
          onChange={handleCompanyChange}
          required
        />

        <label htmlFor="companySupervisorTel">Telefon opiekuna firmy:</label>
        <input
          type="tel"
          id="companySupervisorTel"
          name="supervisorTel"
          value={formData.company.supervisorTel}
          onChange={handleCompanyChange}
          required
        />

        <label htmlFor="startDate">Data rozpoczęcia praktyki:</label>
        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label htmlFor="endDate">Data zakończenia praktyki:</label>
        <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
      
          </div>
          <div id='formPreview' dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      </div>
      <div id='acceptanceForm'><button>Save</button></div>
    </div>
  );
}

export default Form;
