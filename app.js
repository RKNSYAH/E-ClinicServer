const express = require('express');
const sequelize = require('./models/connection');
const app = express();
const bodyParser = require('body-parser');
const dataRouter = require('./routes/DataRouter');
const loginRouter = require('./routes/LoginRouter');
const profileRouter = require('./routes/ProfileRouter');
const klinikRouter = require('./routes/KlinikRouter');
const daftarRouter = require('./routes/DaftarRouter');
const dokterRouter = require('./routes/DokterRouter');
const pasienRouter = require('./routes/PasienRouter');

var useragent = require('express-useragent');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/data',dataRouter)
app.use('/klinik',klinikRouter)
app.use('/login',loginRouter)
app.use('/pasien',pasienRouter)
app.use('/profile',profileRouter)
app.use('/daftar',daftarRouter)
app.use('/dokter',dokterRouter)

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


