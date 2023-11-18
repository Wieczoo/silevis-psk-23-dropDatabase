const express = require('express')

const router = express.Router()
router.get('/', async (req, res) => {
    return res.send('<p style="font-size: 0.4vw; text-align: right; margin-bottom: 0.5vw; margin-top: 2vw;"><b>Załącznik nr 1 do Zarządzenia Nr 54/19<br>Rektora Politechniki Świętokrzyskiej z dnia 20 września 2019 r.</b></p><p style="text-align: center; font-size: 0.7vw; line-height: 2;"><b>Umowa<br>o organizację praktyki studenta Politechniki Świętokrzyskiej</b></p>');
  });


module.exports = router;