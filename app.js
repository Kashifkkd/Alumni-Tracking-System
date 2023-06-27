const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const aluminiDetail = require('./models/Alumini');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// databasae connection
const dbURI = 'mongodb+srv://kashif0123:wlpk6972@cluster0.sxpsnjv.mongodb.net/?retryWrites=true&w=majority&ssl=true';
mongoose.connect(dbURI)
    .then((result) => {
        console.log('working...')
        app.listen(3000);
    })
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);

app.get('/', (req,res) => {
    res.render('home');
})

app.get('/alumini-detail', requireAuth, async (req,res) => {

    aluminiDetail.find({}).then((alumini) => {
        res.render('alumini-page', { data : alumini});
    });
});

app.post('/add-alumini', async (req, res) => {

    const currentAluminiDetails = {
        name : 'Sahil Chiplunkar',
        branch : 'Mechanical Engineering',
        gyear: 2014,
        currentcompany: 'Indian Railways.',
        specializations: 'L&T',
        contactinfo: 90873748220,
        gmail: 'sahil@gmail.com',
    }

    const addAluminiDetail = await aluminiDetail.create(currentAluminiDetails);
});

app.use(authRoutes)

