import '../styles/form.css';
import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import icon_close from '../assets/icons/close.png';
import store from '../utils/store';

const Form = ({applicationID,applicationType, Title}) => {
  

  const [docTitle, setdocTitle] = useState(Title);

  const [visible1, setVisible1] = useState(true);



  const mojDivRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [temporaryData,setTemporaryData] = useState();
  const {closeForm} = useContext(store);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    index: '',
    pesesl: '',
    tel: '',
    fieldOfStudy: '',
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
      zipCode: '',
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

  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState([]);



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
          zipCode: adres[1].substring(0,7),
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

  const saveDataApplication = () =>{

    axios.patch('http://10.5.5.188:3001/api/internship/'+applicationID,{
        company:{
            name: formData.company.name,
            city: formData.company.city,
            street: formData.company.street,
            krs: formData.company.krs,
            nip: formData.company.nip,
            regon: formData.company.regon,
            supervisor:{
                name: formData.company.supervisorName,
                surname: formData.company.supervisorSurname,
                tel: formData.company.supervisorTel.replace,
                email: formData.company.supervisorEmail
            }
        },
        university:{
            supervisor:{
                name: formData.university.supervisorName,
                surname: formData.university.supervisorSurname,
                tel: formData.university.supervisorTel,
                email: formData.university.supervisorEmail
            }
        },
        apprenticeships:{
            startDate: formData.startDate,
            endDate: formData.endDate
        }
    }).then(function(response){console.log(response)})
    .catch(function(error){console.log(error)});
  }


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
    saveDataApplication();


    axios.post('',{})
    .then(function(response){})
    .catch({function(error){console.log(error)}})

    // applicationID
  };

  
  const handleSupervisorChange = (event) => {
    setSelectedSupervisor(event.target.value);
    const selectedSupervisorTel = event.target.options[event.target.selectedIndex].getAttribute('attr-tel');
    const selectedSupervisorEmail = event.target.options[event.target.selectedIndex].getAttribute('attr-email');
    setFormData(prevFormData => ({
      ...prevFormData,
      university: {
        ...prevFormData.company,
        supervisorEmail: selectedSupervisorEmail,
        supervisorTel: selectedSupervisorTel 
      },
    }));
    
  };


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) 
    console.log(user.firstName)

    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('http://10.5.5.188:3001/api/universitysupervisor/');
        setSupervisors(response.data);
      } catch (error) {
        console.error('Error fetching supervisors:', error);
      }
    };

    fetchSupervisors();
  
    if (user) {
      console.log("User data from localStorage:", user);
  
      // Sprawdź, czy istnieją właściwości firstName, lastName i studentNumber
      if (user.firstName && user.lastName && user.studentNumber) {
        setFormData((prevData) => ({
          ...prevData,
          name: user.firstName,
          surname: user.lastName,
          index: user.studentNumber,
        }));
      } else {
        console.error("Brak wymaganych danych użytkownika w localStorage.");
      }
    } else {
      console.error("Brak danych użytkownika w localStorage.");
    }
  }, []);

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

    const html3 = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Zarz_R_54_19_zal_1</title>
      </head>
      <body>
      <div style="margin: 1vw">
        <div style="float: left; width: 40%; margin-bottom: 100px; line-height: 1.5; font-size: 0.7vw">
            <p>
                <b>${formData.name} ${formData.surname}</b><br>
                Pesel: <b>${formData.pesel}</b><br>
                Adres: <b> ${formData.adres} </b><br>
                Nr. telefonu: <b>${formData.tel}</b><br>
                Kierunek studiów <b>${formData.fieldOfStudy}</b><br>
            </p>
        </div>
            
        <div style="float: right; width: 60%; text-align: right; margin-bottom: 140px; font-size: 0.7vw">
          <p>Kielce, ${currentDate}</p>
        </div>
        
    
        <div >
          <p style="text-align: center; line-height: 1.5; font-size: 0.7vw">
            <b>Kierownik<br>
            ds.praktyk studenckich<br>
            ${formData.university.supervisorName} ${formData.university.supervisorSurname} </b>
          </p>
        </div>
          
        <div style=" margin-top: 1vw">
          <p style="text-align: center; font-size: 0.8vw";>
            <b>Podanie<br></b>
          </p>
          <p style="text-align: left; line-height: 1.5; font-size: 0.7vw">
            &#9;Uprzejmie proszę o wyrażenie zgody na realizację czterotygodniowej praktyki studenckiej w zakładzie:
          </p>
          <p style="text-align: center; line-height: 1.5; font-size: 0.7vw">
            <b>
            ${formData.company.name} ${formData.company.street} ${formData.company.zipCode} ${formData.company.city}<br>
            </b>
              Przedstawiciel zakładu: <b>${formData.company.supervisorName} ${formData.company.supervisorSurname} ${formData.company.supervisorTel}</b><br>
              Zakładowy opiekun praktyk: <b>${formData.company.supervisorName} ${formData.company.supervisorSurname}</b> <br>
              Data stażu: <b>${formData.startDate} ${formData.endDate}</b> <br>
          </p>
        </div>
    
        <div style="float:right; margin-top: 30px;">
          <p style="text-align: center; font-size: 0.7vw">
            Z poważaniem<br>
          </p>
          <p style="text-align: center; margin-top: 40px; font-size: 0.7vw">
            .....................................................<br>
          </p>  
          <p style="text-align: center; font-size: 0.7vw">
            podpis studenta
          </p>
        </div>
        
      </div>
      </body>
    </html>`

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

    if(docTitle === "Wniosek na wyrażenie zgody na realizację praktyki"){
      setVisible1(false)
      setHtmlContent(html3);
      
    }else{
      setVisible1(true) 
      setHtmlContent(html);
    }

    
  }, [formData]);


//style={{ visibility: visible1 ? "visible" : "hidden" }}

  return (
    <div id='formBg'>
      <div id="formView">
        <div id='mainContainer'>

          <div id='FormTitle'>
              <h2>{applicationType==2 ? "Podanie o Praktyki": "Podanie o Zaliczenie"}  {Title}</h2>
              <img id='close' src={icon_close} alt="close" onClick={closeForm}></img>
          </div>
          <div id='formInputs' ref={mojDivRef} >
          <div>
      <h3>Formularz</h3>
      <form id='formInputsContainer' onSubmit={handleSubmit} >
        <label htmlFor="name">Imię:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}  />

        <label htmlFor="surname">Nazwisko:</label>
        <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange}  />

        {visible1 && (
      <>
        <label htmlFor="index">Numer indeksu:</label>
        <input
          type="text"
          id="index"
          name="index"
          value={formData.index}
          onChange={handleChange}
        />
      </>
    )}

{!visible1 && (
      <>
        <label htmlFor="pesel">Numer pesel:</label>
        <input type="text" id="pesel" name="pesel" value={formData.pesel} onChange={handleChange} />

        <label htmlFor="tel">Numer telefonu:</label>
        <input type="text" id="tel" name="tel" value={formData.tel} onChange={handleChange} />

        <label htmlFor="adres">Adres</label>
        <input type="text" id="adres" name="adres" value={formData.adres} onChange={handleChange}  />

        <label htmlFor="fieldOfStudy">Kierunek studiów</label>
        <input type="text" id="fieldOfStudy" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange}  />
      </>
    )}

        <label htmlFor="supervisor">Imię i nazwisko opiekuna uniwersytetu:</label>
        <select id="supervisorSelect" value={selectedSupervisor} onChange={handleSupervisorChange}>
        <option value="">Select a supervisor</option>
        {supervisors.map((supervisor) => (
          <option key={supervisor.id} value={supervisor.id} attr-tel={supervisor.tel} attr-email={supervisor.email}  >
            {`${supervisor.name} ${supervisor.surname}`}
          </option>
        ))}
      </select>

      {visible1 && (
      <>
        <label htmlFor="supervisorEmail">Email opiekuna uniwersytetu:</label>
        <input
          type="email"
          id="supervisorEmail"
          name="supervisorEmail"
          value={formData.university.supervisorEmail}
          onChange={handleUniversityChange}
          
        />

<label htmlFor="supervisorTel">Telefon opiekuna uniwersytetu:</label>
        <input
          type="tel"
          id="supervisorTel"
          name="supervisorTel"
          value={formData.university.supervisorTel}
          onChange={handleUniversityChange}
          
        />

    <label htmlFor="dean">Dziekan uniwersytetu:</label>
        <input type="text" id="dean" name="dean" value={formData.university.dean} onChange={handleUniversityChange}  />
      </>
    )}
        
        <label htmlFor="companyNIP">Numer NIP firmy:</label>
        <input type="text" id="companyNIP" name="nip" value={formData.company.nip} onChange={handleCompanyChange}  />

        <label htmlFor="companyName">Nazwa firmy:</label>
        <input type="text" id="companyName" name="name" value={formData.company.name} onChange={handleCompanyChange}  />

        <label htmlFor="companyCity">Miasto firmy:</label>
        <input type="text" id="companyCity" name="city" value={formData.company.city} onChange={handleCompanyChange}  />

        <label htmlFor="companyStreet">Ulica firmy:</label>
        <input type="text" id="companyStreet" name="street" value={formData.company.street} onChange={handleCompanyChange}  />

        <label htmlFor="companyKRS">Numer KRS firmy:</label>
        <input type="text" id="companyKRS" name="krs" value={formData.company.krs} onChange={handleCompanyChange}  />

        <label htmlFor="companyRegon">Numer REGON firmy:</label>
        <input type="text" id="companyRegon" name="regon" value={formData.company.regon} onChange={handleCompanyChange}  />

        <label htmlFor="companySupervisorName">Imię opiekuna firmy:</label>
        <input
          type="text"
          id="companySupervisorName"
          name="supervisorName"
          value={formData.company.supervisorName}
          onChange={handleCompanyChange}
          
        />

        <label htmlFor="companySupervisorSurname">Nazwisko opiekuna firmy:</label>
        <input
          type="text"
          id="companySupervisorSurname"
          name="supervisorSurname"
          value={formData.company.supervisorSurname}
          onChange={handleCompanyChange}
          
        />


{visible1 && (
      <>
        <label htmlFor="companySupervisorEmail">Email opiekuna firmy:</label>
        <input
          type="email"
          id="companySupervisorEmail"
          name="supervisorEmail"
          value={formData.company.supervisorEmail}
          onChange={handleCompanyChange}
          
        />
      </>
    )}
        

        <label htmlFor="companySupervisorTel">Telefon opiekuna firmy:</label>
        <input
          type="tel"
          id="companySupervisorTel"
          name="supervisorTel"
          value={formData.company.supervisorTel}
          onChange={handleCompanyChange}
          
        />

        <label htmlFor="startDate">Data rozpoczęcia praktyki:</label>
        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange}  />

        <label htmlFor="endDate">Data zakończenia praktyki:</label>
        <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange}  />

        <button type="submit">Submit</button>
      </form>

      </div>
      
      </div>
          
          <div id='formPreview' dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        </div>
      </div>
     
    </div>
  );
}

export default Form;
