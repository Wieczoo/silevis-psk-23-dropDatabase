const getCompanyInfo = async (req, res) => {
    // request({
    //     method: 'GET',
    //     uri: 'https://wl-api.mf.gov.pl/api/search/nip/6572938302?date=2022-12-13'
    //   }, function (error, response, body){
    //     if(!error && response.statusCode == 200){
    //       res.json(body);
    //     }
    //   })
    let currentDate = new Date().toJSON().slice(0, 10);
console.log(req.params.nip.length)
    const url = 'https://wl-api.mf.gov.pl/api/search/nip/'+req.params.nip+'?date='+currentDate
fetch(url)
.then(function(response) {
  // The response is a Response instance.
  // You parse the data into a useable format using `.json()`
  return response.text();
}).then(function(data) {
  // `data` is the parsed version of the JSON returned from the above endpoint.
  console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
  data = data.replace(/\\/g, '');

// Parsowanie tekstu JSON do obiektu
var jsonObj = JSON.parse(data);
  res.json(jsonObj);
});

  }

module.exports = {getCompanyInfo}