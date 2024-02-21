const express = require('express');
const app = express();
const ngrok = require('ngrok');
const cors = require('cors');

//port 
const PORT = 8080;

//cors
// app.use(cors());

//connnectionDB
const connectionDB = require('./connection');
const url = 'mongodb://localhost:27017/urlShortner';
connectionDB(url);

//cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//routes import
const userAuthenticationHandleRoute = require('./routes/routeUserAuthenticationHandle');
const urlShortenerServiceHandleRoute = require('./routes/routeUrlShortenerServiceHandle');
const mainServiceHandleRoute = require('./routes/routeMainServiceHandle');

//middlewares
app.use('/', express.static(__dirname + '/public/docs'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const userAuthenticationCheck = require('./middlewares/userAuthenticationCheck');

//seriveces
const urlRedirectService = require('./services/url/serviceUrlRedirect');

//routing to routes
app.get('/', (req, res) => {
    res.sendFile('/index.html'); //render default page
});
app.get('/register', (req, res) => {
    res.sendFile('/register.html'); //render register page
});
app.get('/login', (req, res) => {
    res.sendFile('/login.html'); //render login page
});

app.use('/user', userAuthenticationHandleRoute); //handle user authentication,logout

app.use('/api/url/', userAuthenticationCheck, urlShortenerServiceHandleRoute); //generate shortid

app.use('/services', userAuthenticationCheck, mainServiceHandleRoute); //main service page

// load website with shortId
app.get('/:shortID', urlRedirectService);

// website with ngrok
// const token = 'YOUR_NGROK_AUTHTOKEN';
// (async () => {
//     try {
//         const url = await ngrok.connect({
//             proto: 'http', // http|tcp|tls, defaults to http
//             addr: PORT, // port or network address, defaults to 80
//             authtoken: token, // your authtoken from ngrok.com
//             region: 'in', // one of ngrok regions (us, eu, au, ap, sa, jp, in), defaults to us
//             onStatusChange: status => { }, // 'closed' - connection is lost, 'connected' - reconnected
//             onLogEvent: data => { }, // returns stdout messages from ngrok process
//         });
//         console.log(`Server is public at ${url}`);
//     } catch (error) {
//         console.error('Error starting ngrok:', error.message);
//     }
// })();

//server listen
app.listen(PORT, () => { console.log(`server is running on ${PORT}`) });