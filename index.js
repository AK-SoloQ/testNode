let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('./middelware/flash')

//Moteur de template 
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(session({
    secret: 'sfdsdqfsqfsd',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
app.use(flash);

// Routes
app.get('/', (request, response) => {
    console.log(request.session);
    response.render('pages/index');
});
app.post('/', (req, res) => {
    console.log(req.body);
    if (req.body.message === undefined || req.body.message === '') {
        req.flash('error','vous n avez pas poste de message ')
        res.redirect('/');
    }
});

app.listen(8282);