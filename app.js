const express = require('express');
const bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


app.route('/jetpacks/:id?/:start_date?/:end_date?')
    .get(require('./controller/Jetpack/GetJetpackController'))
    .post(require('./controller/Jetpack/CreateJetpackController'))
    .delete(require('./controller/Jetpack/DeleteJetpackController'))

app.route('/booking')
   .get(require('./controller/Booking/GetBookingController'))
   .post(require('./controller/Booking/CreateBookingController'))

app.listen(3000, function () {
    console.log('Jetpack backend listening on port 3000!')
});
